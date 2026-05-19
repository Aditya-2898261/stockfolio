const mongoose = require('mongoose');

const holdingSchema = new mongoose.Schema({ 
 user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
stock:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Stock'
      },
quantity:{
    type:Number
}
});


const Holding = mongoose.model('Holding', holdingSchema);

module.exports = Holding;