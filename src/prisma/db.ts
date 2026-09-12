import 'dotenv/config';
import 'temporal-polyfill/global';
import postgres from '@prisma/orm-postgres/runtime';
import type { Contract } from './contract.d';
import contractJson from './contract.json' with { type: 'json' };

function getDatabaseUrl(): string {
  const value = process.env['DATABASE_URL']?.trim();
  const url = value?.replace(/^(['"])(.*)\1$/, '$2');

  if (!url) {
    throw new Error('DATABASE_URL is required at runtime.');
  }

  return url;
}

export const db = postgres<Contract>({
  contractJson,
});

let connection: Promise<void> | undefined;

export function connectDatabase(): Promise<void> {
  connection ??= db
    .connect({ url: getDatabaseUrl() })
    .then(() => undefined)
    .catch((error: unknown) => {
      connection = undefined;
      throw error;
    });
  return connection;
}
