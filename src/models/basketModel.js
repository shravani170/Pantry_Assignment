const mongoose = require('mongoose');

const basketSchema = new mongoose.Schema({

        basketName:{
            type:String,
            unique:true
        },
        ttl:{
            type:Date
        },
        pantryId:{
            type: mongoose.Schema.Types.ObjectId,
            ref:'Pantry'
        },
        item:new mongoose.Schema.Types.Mixed

} , { timestamps : true});

module.exports = mongoose.model('Basket1' , basketSchema);