const express = require('express');
const multer = require('multer');
const path = require('path');
const config = require('../config');
const { nanoid } = require('nanoid');
const db = require('../mysqlDb');
const router = express.Router();


module.exports = router;