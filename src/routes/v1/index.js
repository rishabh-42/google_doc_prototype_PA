const express = require('express');
const authRoute = require('./auth.route');
const pageRoute = require('./page.route');

const router = express.Router();

router.use('/auth', authRoute);
router.use('/page', pageRoute);

module.exports = router;
