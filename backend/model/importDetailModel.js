
import mongoose from 'mongoose'

const importDetailSchema = new mongoose.Schema({
    ImportID:String,
    ProductID:String,
    Price:Number,
    Amount:Number,
    Total:Number
})

const ImportDetailCollection = mongoose.model('import_detail', importDetailSchema);

export default ImportDetailCollection;