require('dotenv').config();

const mariadb = require('mariadb');

const { parseDatabaseUrl } = require('../config/databaseUrl');

const adminUrl =
  process.env.DATABASE_ADMIN_URL ||
  'mysql://root:@localhost:3306/mysql';
const databaseName = process.env.DATABASE_NAME || 'web_polling';

const quoteIdentifier = (value) => `\`${value.replace(/`/g, '``')}\``;

const createDatabaseIfMissing = async (client, name) => {
  const existing = await client.query(
    'SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = ?',
    [name],
  );

  if (existing.length > 0) {
    console.log(`Database "${name}" sudah ada.`);
    return;
  }

  await client.query(
    `CREATE DATABASE ${quoteIdentifier(name)} CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`,
  );
  console.log(`Database "${name}" berhasil dibuat.`);
};

const main = async () => {
  const client = await mariadb.createConnection(parseDatabaseUrl(adminUrl));

  await createDatabaseIfMissing(client, databaseName);
  await client.end();
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
