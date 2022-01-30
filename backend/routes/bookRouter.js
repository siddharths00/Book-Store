const router = require('express').Router()
const bookCtrl = require('../controllers/bookControl')

router.get('/books', bookCtrl.getBooks);

module.exports = router