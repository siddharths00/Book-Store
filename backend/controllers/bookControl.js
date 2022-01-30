const Books = require('../models/bookModel')

// Filter, sorting and paginating

class APIfeatures {
    constructor(query, queryString){
        this.query = query;
        this.queryString = queryString;
    }
    filtering(){
       const queryObj = {...this.queryString} //queryString = req.query

       const excludedFields = ['page', 'sort', 'limit']
       excludedFields.forEach(el => delete(queryObj[el]))
       
       let queryStr = JSON.stringify(queryObj)
       queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, match => '$' + match)

    //    gte = greater than or equal
    //    lte = lesser than or equal
    //    lt = lesser than
    //    gt = greater than
       this.query.find(JSON.parse(queryStr))
         
       return this;
    }

    sorting(){
        if(this.queryString.sort){
            const sortBy = this.queryString.sort.split(',').join(' ')
            this.query = this.query.sort(sortBy)
        }else{
            this.query = this.query.sort('-createdAt')
        }

        return this;
    }

    paginating(){
        const page = this.queryString.page * 1 || 1
        const limit = this.queryString.limit * 1 || 9
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit)
        return this;
    }
}

const bookCtrl = {
    getBooks: async(req, res) =>{
        try {
            const features = new APIfeatures(Books.find(), req.query)
            // .filtering().sorting().paginating()

            const books = await features.query

            res.json({
                status: 'success',
                result: books.length,
                books: books
            })
            return;
            
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    createBook: async(req, res) =>{
        try {
            const {book_id, title, price, description, content, images} = req.body;
            if(!images) return res.status(400).json({msg: "No image upload"})

            const Book = await Books.findOne({book_id})
            if(Book)
                return res.status(400).json({msg: "This Book already exists."})

            const newBook = new Books({
                book_id:book_id, title: title.toLowerCase(), price:price, description:description, content:content, images:images
            })

            await newBook.save()
            res.json({msg: "Created a Book"})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    deleteBook: async(req, res) =>{
        try {
            await Books.findByIdAndDelete(req.params.id)
            res.json({msg: "Deleted a Book"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updateBook: async(req, res) =>{
        try {
            const {title, price, description, content, images} = req.body;
            if(!images) return res.status(400).json({msg: "No image upload"})

            await Books.findOneAndUpdate({_id: req.params.id}, {
                title: title.toLowerCase(), price, description, content, images
            })

            res.json({msg: "Updated a Book"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}


module.exports = bookCtrl