const { PrismaClient } = require('@prisma/client');
const { PrismaMariaDb } = require('@prisma/adapter-mariadb');

const { parseDatabaseUrl } = require('./databaseUrl');

const adapter = new PrismaMariaDb(parseDatabaseUrl(process.env.DATABASE_URL));

const prisma = new PrismaClient({ adapter });

module.exports = { prisma };
