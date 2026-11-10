# Rasyiqi Security & Hardening Specification

Security in Rasyiqi projects is built with **Zero Trust** and **Defense in Depth**. Every external interaction and tenant boundary must be defended programmatically.

---

## 1. Anti-SSRF Safe Outbound Fetcher (`safeOutboundUrl`)

Server-Side Request Forgery (SSRF) occurs when an application makes outbound HTTP requests to user-supplied URLs (e.g., custom webhooks, logo downloads, RSS feeds, AI image imports).

### Enforcement:
Before making **any** outbound HTTP call using a user-controlled URL, you **MUST** pass it through the `isSafeOutboundHost` validator.

### Forbidden Targets:
- Loopback addresses (`127.0.0.1`, `localhost`, `::1`).
- RFC 1918 Private IPv4 ranges (`10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`).
- Link-local and cloud metadata addresses (`169.254.169.254` AWS/GCP metadata).
- Non-HTTP(S) schemes (`file://`, `gopher://`, `ftp://`).
- Domain names that resolve (via DNS lookup) to any of the above IP ranges.

See [safeOutboundUrl.ts](../assets/safeOutboundUrl.ts) for the reference implementation.

---

## 2. Anti-IDOR Multi-Tenant Authorization Guard

Insecure Direct Object Reference (IDOR) happens when an attacker modifies a parameter (e.g., `id=ord_123` or `store_id=xyz`) to view or mutate another tenant's data.

### Rule: Never Trust Client Tenant IDs
1. Derive the active `tenantId` / `userId` / `storeId` **strictly from the verified server-side session or JWT**.
2. Never allow queries to omit the tenant check:
   ```typescript
   // ❌ BAD: Vulnerable to IDOR!
   const product = await db.select().from(products).where(eq(products.id, req.params.id));

   // ✅ GOOD: Guaranteed Tenant Isolation
   const product = await db
     .select()
     .from(products)
     .where(
       and(
         eq(products.id, req.params.id),
         eq(products.storeId, session.user.storeId) // Enforced tenant boundary
       )
     );
   ```

---

## 3. Token Privilege Isolation

Applications often have multiple user types interacting with the same underlying entities (e.g., store owners managing a course vs students watching a course).

### Principles:
1. **Separate Token Schemes**: Issue discrete token types for discrete roles (e.g., `x-auth-token` for dashboard sellers vs `x-hub-token` for guest buyers).
2. **Explicit Role Downgrading**: A guest/buyer token must **always** resolve to `role: 'guest'` or `role: 'buyer'`, even if the associated email address happens to belong to a superadmin or seller in another table.
3. **Privilege Boundary**: A guest hub token can never access merchant analytics, mutate product prices, or approve payouts.

---

## 4. HMAC Webhook Verification & Replay Protection

Payment gateways and third-party webhooks must be verified cryptographically:

1. **Raw Body Integrity**: Always compute HMAC over the raw request buffer before JSON parsing.
2. **Timing-Safe Comparison**: Use `crypto.timingSafeEqual` or `Bun.CryptoHasher` to compare signatures, preventing timing side-channel attacks.
3. **Nonce / Timestamp Validation**: Reject webhook requests where the timestamp is older than 5 minutes to defend against replay attacks.

---

## 5. Input Sanitization & Anti-XSS

1. **Rich Text / HTML Inputs**: Never render raw HTML without sanitizing via **DOMPurify**:
   ```typescript
   import DOMPurify from 'dompurify';

   export function sanitizeContent(dirtyHtml: string): string {
     return DOMPurify.sanitize(dirtyHtml, {
       ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'ul', 'ol', 'li', 'h1', 'h2', 'h3', 'pre', 'code', 'blockquote'],
       ALLOWED_ATTR: ['href', 'target', 'rel', 'class']
     });
   }
   ```
2. **URL Schemes**: Strip any attribute starting with `javascript:`, `data:text/html`, or `vbscript:`.
