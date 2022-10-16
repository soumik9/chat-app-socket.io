const mongoose = require('mongoose');
const validator = require('validator')
const { ObjectId } = mongoose.Schema.Types

const brandSchema = mongoose.Schema({
    name: { 
        type: String, 
        required: [true, 'Name filed is required'],
        trim: true,
        unique: true,
    },
    description: String,
    email: {
        type: String,
        validate: [validator.isEmail, 'Please provide a valid email.'],
    },
    website: { 
        type: String, 
        required: [true, 'Name filed is required'],
        trim: true,
        validate: [validator.isUrl, 'Please provide a valid URL.'],
    },
    location: String,
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "active"
    },
    products: [{
        type: ObjectId,
        ref: "Product"
    }],
    suppliers: [{
        name: String,
        contact: String,
        id: {
            type: ObjectId,
            ref: "Supplier"
        }
    }]
}, { timestamps: true });

const Brand = new mongoose.model("Brand", brandSchema);
module.exports = Brand