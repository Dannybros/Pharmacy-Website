
import mongoose from 'mongoose'

const categorySchema = new mongoose.Schema({
    Name:String,
})

const CategoryCollection = mongoose.model('categories', categorySchema);

export default CategoryCollection;