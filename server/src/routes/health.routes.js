const { Router } = require('express');

const router = Router();

router.get('/', (_req, res) => {
  return res.json({
    status: 'ok',
    service: 'web-polling-api',
    timestamp: new Date().toISOString(),
  });
});

module.exports = router;
