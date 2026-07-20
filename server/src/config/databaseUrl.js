const parseDatabaseUrl = (connectionString) => {
  const url = new URL(connectionString);

  return {
    host: url.hostname,
    port: url.port ? Number(url.port) : 3306,
    user: decodeURIComponent(url.username || 'root'),
    password: decodeURIComponent(url.password || ''),
    database: url.pathname.replace(/^\//, '') || undefined,
  };
};

module.exports = { parseDatabaseUrl };
