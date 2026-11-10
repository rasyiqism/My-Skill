/**
 * Generic In-Memory Cache with Request Coalescing (Single-Flight) & Stale-While-Revalidate.
 * Mencegah cache stampede (thundering herd) pada endpoint publik & hot-query database.
 */

export interface CacheOptions {
  /** Default Time-to-Live in milliseconds */
  defaultTtlMs?: number;
  /** Maximum number of entries before oldest are purged */
  maxEntries?: number;
  /** Interval in milliseconds for automatic expired key cleanup (default 30s) */
  cleanupIntervalMs?: number;
}

export interface GetOrComputeOptions {
  /** Override TTL for this specific key in milliseconds */
  ttlMs?: number;
  /** If true, return stale data immediately while computing fresh data in background */
  staleWhileRevalidate?: boolean;
}

export class InMemoryCache<T = any> {
  private store = new Map<string, { data: T; expiresAt: number }>();
  private inflight = new Map<string, Promise<T>>();
  private defaultTtlMs: number;
  private maxEntries: number;
  private cleanupTimer?: NodeJS.Timeout;

  constructor(options: CacheOptions = {}) {
    this.defaultTtlMs = options.defaultTtlMs ?? 15_000;
    this.maxEntries = options.maxEntries ?? 10_000;

    const cleanupInterval = options.cleanupIntervalMs ?? 30_000;
    if (typeof setInterval !== 'undefined') {
      this.cleanupTimer = setInterval(() => this.cleanup(), cleanupInterval);
      if (this.cleanupTimer && typeof this.cleanupTimer.unref === 'function') {
        this.cleanupTimer.unref();
      }
    }
  }

  /**
   * Mengambil item dari cache jika belum kedaluwarsa.
   */
  get(key: string): T | undefined {
    const entry = this.store.get(key);
    if (!entry) return undefined;
    if (Date.now() > entry.expiresAt) {
      this.store.delete(key);
      return undefined;
    }
    return entry.data;
  }

  /**
   * Mengambil item dari cache, mengizinkan data stale (basi) jika ada.
   */
  getRaw(key: string): { data: T; isStale: boolean } | undefined {
    const entry = this.store.get(key);
    if (!entry) return undefined;
    const isStale = Date.now() > entry.expiresAt;
    return { data: entry.data, isStale };
  }

  /**
   * Menyimpan item ke cache dengan TTL tertentu.
   */
  set(key: string, data: T, ttlMs?: number): void {
    if (this.store.size >= this.maxEntries) {
      // Evict first (oldest) key
      const firstKey = this.store.keys().next().value;
      if (firstKey) this.store.delete(firstKey);
    }
    const duration = ttlMs !== undefined ? ttlMs : this.defaultTtlMs;
    this.store.set(key, {
      data,
      expiresAt: Date.now() + duration
    });
  }

  /**
   * Request coalescing (single-flight) execution.
   * Semua pemanggil yang meminta key yang sama secara bersamaan akan berbagi SATU Promise compute.
   */
  async singleFlight(key: string, compute: () => Promise<T>): Promise<T> {
    const existing = this.inflight.get(key);
    if (existing) return existing;

    const promise = compute().finally(() => {
      this.inflight.delete(key);
    });

    this.inflight.set(key, promise);
    return promise;
  }

  /**
   * Ambil data dari cache jika fresh. Jika miss/expired, lakukan single-flight computation.
   * Mendukung opsi `staleWhileRevalidate`.
   */
  async getOrCompute(
    key: string,
    compute: () => Promise<T>,
    options: GetOrComputeOptions = {}
  ): Promise<T> {
    const raw = this.getRaw(key);
    const ttl = options.ttlMs !== undefined ? options.ttlMs : this.defaultTtlMs;

    // 1. Cache HIT (Fresh)
    if (raw && !raw.isStale) {
      return raw.data;
    }

    // 2. Cache HIT tapi Stale (Stale-While-Revalidate)
    if (raw && raw.isStale && options.staleWhileRevalidate) {
      // Jalankan background refresh via single-flight tanpa memblokir return
      this.singleFlight(key, async () => {
        try {
          const fresh = await compute();
          this.set(key, fresh, ttl);
          return fresh;
        } catch (e) {
          console.warn(`[Cache] Background SWR refresh failed for key "${key}":`, e);
          return raw.data;
        }
      });
      return raw.data;
    }

    // 3. Cache MISS atau expired tanpa SWR: Single-flight compute & cache
    return this.singleFlight(key, async () => {
      const fresh = await compute();
      this.set(key, fresh, ttl);
      return fresh;
    });
  }

  /**
   * Menghapus cache spesifik berdasarkan key.
   */
  delete(key: string): boolean {
    this.inflight.delete(key);
    return this.store.delete(key);
  }

  /**
   * Menghapus seluruh cache yang mengandung prefix tertentu.
   */
  deleteByPrefix(prefix: string): number {
    let deletedCount = 0;
    for (const key of this.store.keys()) {
      if (key.startsWith(prefix)) {
        this.delete(key);
        deletedCount++;
      }
    }
    return deletedCount;
  }

  /**
   * Menghapus seluruh entri cache.
   */
  clear(): void {
    this.store.clear();
    this.inflight.clear();
  }

  /**
   * Membersihkan entri yang sudah kedaluwarsa.
   */
  cleanup(): number {
    const now = Date.now();
    let cleaned = 0;
    for (const [key, entry] of this.store.entries()) {
      if (now > entry.expiresAt) {
        this.store.delete(key);
        cleaned++;
      }
    }
    return cleaned;
  }

  /**
   * Jumlah entri tersimpan saat ini.
   */
  get size(): number {
    return this.store.size;
  }
}

/**
 * Factory helper untuk membuat shared cache instan.
 */
export function createInMemoryCache<T = any>(options?: CacheOptions): InMemoryCache<T> {
  return new InMemoryCache<T>(options);
}
