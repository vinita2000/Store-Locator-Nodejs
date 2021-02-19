const mongoose = require('mongoose');
const geocoder = require('../utils/geocoder');

const storeSchema = new mongoose.Schema({
    storeID: {
        type: String,
        required: [
            true, 'Please add a store ID'
        ],
        maxlength: [
            10, 'Store ID must be less than 10 characters'
        ],
        unique: true,
        trim: true
    },
    address: {
        type: String,
        required: [true, 'Please add a address']
    },
    location: {
        type: {
            type: String,
            enum: ['Point']
        },
        coordinates: {
            type: [Number],
            index: '2dsphere'
        },
        formattedAddress: String
    },
    createdAt : {
        type: Date,
        default: Date.now()
    }
});

// geocode create location
storeSchema.pre('save', async function(next){
    const loc = await geocoder.geocode(this.address);
    this.location = {
        type: 'Point',
        coordinates: [loc[0].longitude, loc[0].latitude],
        formattedAddress: loc[0].formattedAddress 
    };
    // do not save address to db
    this.address = undefined;
    next();
});

module.exports = mongoose.model('store', storeSchema);