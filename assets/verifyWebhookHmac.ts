import crypto from 'node:crypto';

export interface VerifyWebhookHmacOptions {
  /** Raw request body as Buffer or UTF-8 string */
  rawBody: Buffer | string;
  /** Secret key shared with the webhook provider */
  secret: string;
  /** Signature string provided in the request header */
  signature: string;
  /** Optional timestamp header value to guard against replay attacks */
  timestamp?: string | number;
  /** Maximum acceptable age of the webhook in seconds (default: 300 = 5 minutes) */
  toleranceSeconds?: number;
  /** Hashing algorithm, defaults to sha256 */
  algorithm?: 'sha256' | 'sha512';
  /** Optional signature prefix (e.g. 'sha256=' or 'v1=') to strip before comparison */
  signaturePrefix?: string;
}

export interface WebhookVerificationResult {
  isValid: boolean;
  error?: 'SIGNATURE_MISMATCH' | 'TIMESTAMP_TOO_OLD' | 'TIMESTAMP_IN_FUTURE' | 'INVALID_INPUT';
  message?: string;
}

/**
 * Timing-safe cryptographic HMAC webhook signature verifier.
 * Defends against timing attacks and replay attacks.
 */
export function verifyWebhookHmac(options: VerifyWebhookHmacOptions): WebhookVerificationResult {
  const {
    rawBody,
    secret,
    signature,
    timestamp,
    toleranceSeconds = 300,
    algorithm = 'sha256',
    signaturePrefix = ''
  } = options;

  if (!rawBody || !secret || !signature) {
    return {
      isValid: false,
      error: 'INVALID_INPUT',
      message: 'rawBody, secret, and signature are required.'
    };
  }

  // 1. Guard against Replay Attacks if timestamp is provided
  if (timestamp !== undefined) {
    const tsNum = typeof timestamp === 'string' ? Number.parseInt(timestamp, 10) : timestamp;
    if (Number.isNaN(tsNum)) {
      return {
        isValid: false,
        error: 'INVALID_INPUT',
        message: 'Invalid timestamp header value.'
      };
    }

    const currentEpoch = Math.floor(Date.now() / 1000);
    // Tolerate slight server clock skew (up to 30s in the future)
    if (tsNum > currentEpoch + 30) {
      return {
        isValid: false,
        error: 'TIMESTAMP_IN_FUTURE',
        message: 'Webhook timestamp is in the future.'
      };
    }

    if (currentEpoch - tsNum > toleranceSeconds) {
      return {
        isValid: false,
        error: 'TIMESTAMP_TOO_OLD',
        message: `Webhook timestamp expired (older than ${toleranceSeconds} seconds).`
      };
    }
  }

  // 2. Normalize Signature
  let cleanSignature = signature.trim();
  if (signaturePrefix && cleanSignature.startsWith(signaturePrefix)) {
    cleanSignature = cleanSignature.slice(signaturePrefix.length);
  }

  // 3. Compute Expected HMAC Signature
  const hmac = crypto.createHmac(algorithm, secret);
  const payloadBuffer = typeof rawBody === 'string' ? Buffer.from(rawBody, 'utf-8') : rawBody;
  hmac.update(payloadBuffer);
  const expectedSignatureHex = hmac.digest('hex');

  // 4. Timing-safe comparison to prevent timing attacks
  const signatureBuffer = Buffer.from(cleanSignature, 'hex');
  const expectedBuffer = Buffer.from(expectedSignatureHex, 'hex');

  if (signatureBuffer.length !== expectedBuffer.length) {
    return {
      isValid: false,
      error: 'SIGNATURE_MISMATCH',
      message: 'Webhook signature length does not match expected signature.'
    };
  }

  const isMatch = crypto.timingSafeEqual(signatureBuffer, expectedBuffer);

  if (!isMatch) {
    return {
      isValid: false,
      error: 'SIGNATURE_MISMATCH',
      message: 'Webhook signature verification failed.'
    };
  }

  return { isValid: true };
}

/**
 * Utility to generate HMAC signature (useful for unit tests and testing webhook senders).
 */
export function generateWebhookHmac(
  rawBody: Buffer | string,
  secret: string,
  algorithm: 'sha256' | 'sha512' = 'sha256'
): string {
  const hmac = crypto.createHmac(algorithm, secret);
  const payloadBuffer = typeof rawBody === 'string' ? Buffer.from(rawBody, 'utf-8') : rawBody;
  hmac.update(payloadBuffer);
  return hmac.digest('hex');
}
