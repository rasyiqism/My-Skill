import { drizzle } from 'drizzle-orm/node-postgres';
import { pgTable, text, timestamp, integer, boolean, jsonb } from 'drizzle-orm/pg-core';
import { sql, eq, and } from 'drizzle-orm';
import pg from 'pg';

const { Pool } = pg;

// 1. Connection Pool
export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
});

export const db = drizzle(pool);

// 2. Sample Standard Schema Pattern (NO FOREIGN KEYS - Application-Level Integrity)
export const users = pgTable('users', {
  id: text('id').primaryKey().default(sql`gen_random_uuid()`),
  email: text('email').notNull().unique(),
  name: text('name').notNull(),
  role: text('role').notNull().default('user'), // 'user' | 'admin'
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

export const orders = pgTable('orders', {
  id: text('id').primaryKey().default(sql`gen_random_uuid()`),
  userId: text('user_id').notNull(), // No .references() - Plain indexed column
  totalAmount: integer('total_amount').notNull(), // Store whole units (e.g. IDR)
  status: text('status').notNull().default('PENDING'), // 'PENDING' | 'PAID' | 'FAILED'
  metadata: jsonb('metadata').default(sql`'{}'::jsonb`),
  paidAt: timestamp('paid_at', { withTimezone: true }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

// 3. Atomic Transaction Pattern
export async function markOrderPaid(orderId: string, userId: string, amount: number) {
  return await db.transaction(async (tx) => {
    const [order] = await tx
      .update(orders)
      .set({
        status: 'PAID',
        paidAt: new Date(),
        updatedAt: new Date(),
      })
      .where(and(eq(orders.id, orderId), eq(orders.userId, userId), eq(orders.status, 'PENDING')))
      .returning();

    if (!order) {
      throw new Error(`Order ${orderId} not found or already settled.`);
    }

    return order;
  });
}
