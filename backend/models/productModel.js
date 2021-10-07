const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please enter product Name'],
        trim:true
    },
    description:{
        type:String,
        required:[true,'Please enter product description']
    },
    price:{
        type:String,
        required:[true,'Please enter product Price'],
        maxLength:[8, "Price cannot exceed 8 char"]

    },
    rating:{
        type:Number,
        default:0
    },
    images:[
        {
            public_id:{
                type:String,
                required: true
            },
            url:{
                type:String,
                required: true
            }
        }
    ],
    category:{
        type:String,
        required: [true, "Please enter Product Category"]
    },
    stock:{
        type:Number,
        required: [true, 'Please enter Product Stock'],
        maxLength:[4, 'Stock exceed 4 char'],
        default:1
    },
    numOfReviews:{
        type:Number,
        default: 0
    },
    reviews:[
        {
            name:{
                type:String,
                required: true
            },
            rating:{
                type:Number,
                required: true
            },
            Comment:{
                type:String,
                required: true
            }
        }
    ],
    createdAt:{
        type:Date,
        default: Date.now
    }

})

module.exports = mongoose.model('Product', productSchema)