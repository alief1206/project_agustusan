const parseDatabaseUrl = (connectionString) => {
  if (!connectionString) return {};
  const url = new URL(connectionString);

  const sslParam = url.searchParams.get('sslaccept') || url.searchParams.get('sslmode') || url.searchParams.get('ssl-mode');
  const hasSsl = Boolean(sslParam) || url.hostname.includes('aivencloud.com');

  return {
    host: url.hostname,
    port: url.port ? Number(url.port) : 3306,
    user: decodeURIComponent(url.username || 'root'),
    password: decodeURIComponent(url.password || ''),
    database: url.pathname.replace(/^\//, '') || undefined,
    connectTimeout: 20000,
    acquireTimeout: 20000,
    connectionLimit: 10,
    ...(hasSsl ? { ssl: { rejectUnauthorized: false } } : {}),
  };
};

module.exports = { parseDatabaseUrl };
