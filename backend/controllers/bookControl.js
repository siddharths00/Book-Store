const Books = require('../models/bookModel')


const bookCtrl = {
    getBooks: async (req, res) => {
        try {

            const books = await Books.find()

            res.json({
                status: 'success',
                result: books.length,
                books: books
            })
            return;

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    }
}


module.exports = bookCtrl