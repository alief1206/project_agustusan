const { Router } = require('express');

const authRoutes = require('./auth.routes');
const candidateRoutes = require('./candidate.routes');
const categoryRoutes = require('./category.routes');
const healthRoutes = require('./health.routes');
const resultRoutes = require('./result.routes');
const voteRoutes = require('./vote.routes');

const router = Router();

router.use('/auth', authRoutes);
router.use('/candidates', candidateRoutes);
router.use('/categories', categoryRoutes);
router.use('/health', healthRoutes);
router.use('/results', resultRoutes);
router.use('/votes', voteRoutes);

module.exports = router;
