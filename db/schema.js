import {sqliteTable,text,integer} from 'drizzle-orm/sqlite-core';
export const payments=sqliteTable('payments',{
 id:text('id').primaryKey(),name:text('name').notNull(),whatsapp:text('whatsapp').notNull(),transactionId:text('transaction_id').notNull().unique(),amount:integer('amount').notNull(),status:text('status').notNull().default('pending'),createdAt:text('created_at').notNull()
});
