const { Router } = require('express');

const { createVote } = require('../controllers/vote.controller');
const { asyncHandler } = require('../utils/asyncHandler');

const router = Router();

router.post('/', asyncHandler(createVote));

module.exports = router;
