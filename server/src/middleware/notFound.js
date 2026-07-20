const notFound = (req, res) => {
  return res.status(404).json({
    message: `Endpoint ${req.method} ${req.originalUrl} tidak ditemukan.`,
  });
};

module.exports = { notFound };
