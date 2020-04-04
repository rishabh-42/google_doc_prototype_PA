const express = require('express');
const auth = require('../../middlewares/auth');
const { viewPage } = require('../../controllers/page.controller');


const router = express.Router();

router
  .route('/')
  .get(auth('user'), viewPage);

module.exports = router;
