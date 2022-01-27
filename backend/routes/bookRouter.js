const router = require('express').Router()
const bookCtrl = require('../controllers/bookControl')
const auth = require('../middleware/auth')


router.get('/books', bookCtrl.getBooks);
router.post('/books', bookCtrl.createBook)



module.exports = router