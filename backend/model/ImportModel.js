
import mongoose from 'mongoose'

const importSchema = new mongoose.Schema({
    ImportTotal:Number,
    ImportDate:String,
    SupplierID:String,
    Status:String,
    ImportOrders:{ type : Array , "default" : [] },
})

const ImportCollection = mongoose.model('imports', importSchema);

export default ImportCollection;