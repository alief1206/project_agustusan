require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const { PrismaMariaDb } = require('@prisma/adapter-mariadb');
const { parseDatabaseUrl } = require('./databaseUrl');

const dbUrl = process.env.DATABASE_URL;
if (!dbUrl) {
  console.warn('WARNING: DATABASE_URL environment variable is missing!');
}

const adapter = new PrismaMariaDb(parseDatabaseUrl(dbUrl));
const prisma = new PrismaClient({ adapter });

module.exports = { prisma };
