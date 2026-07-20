const { Router } = require('express');

const { login, me } = require('../controllers/auth.controller');
const { authenticateAdmin } = require('../middleware/auth');
const { asyncHandler } = require('../utils/asyncHandler');

const router = Router();

router.post('/login', asyncHandler(login));
router.get('/me', authenticateAdmin, asyncHandler(me));

module.exports = router;
