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
    },

    createBook: async (req, res) => {
        try {

            const { book_id, title, price, description, images } = req.body;

            if(title.length===0 || price===0 || description.length===0 || book_id===0 || images.length==0)
            {
                res.json({ status: 400, msg: req.body }).end();
                return;
            }
            const book = await Books.findOne({ book_id });

            if (book) {
                res.status(400).json({ status: 400, msg: "Book ID must be unique" }).end();
                return;
            }

            const newBook = new Books({
                book_id, title, price, description, images
            })
            await newBook.save();
            res.status(200).json({msg: "Added Book"});

        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    deleteBook: async(req, res) =>{
        try {
            await Books.findByIdAndDelete(req.params.id);
            res.status(200).json({msg: "Deleted Book"}).end();
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updateBook: async(req, res) =>{
        try {
            const { book_id, title, price, description, images } = req.body;
            if(!images) return res.status(400).json({msg: "No image upload"})

            await Books.findOneAndUpdate({book_id: req.params.id}, {
                title, price, description, book_id, images
            })

            res.json({msg: "Updated a Product"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}


module.exports = bookCtrl