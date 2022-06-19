import mongoose from 'mongoose'

const id =  mongoose.Types.ObjectId();

const supplierSchema = new mongoose.Schema({
    Supplier_ID: mongoose.ObjectId,
    SupplierName:String,
    Phone:Number,
    Email:String,
})

const SupplierCollection = mongoose.model('supplier', supplierSchema);

export default SupplierCollection;