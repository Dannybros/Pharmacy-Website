
import mongoose from 'mongoose'

const itemTypeSchema = new mongoose.Schema({
    ItemTypeID:mongoose.ObjectId,
    ItemTypeName:String,
})

const ItemTypeCollection = mongoose.model('itemType', itemTypeSchema);

export default ItemTypeCollection;