const Store = require('../models/store');

// get all stores
// @routes GET api/v1/stores
// access - public
exports.getStores = async (req, res, next) => {
    try {
        const stores = await Store.find();
        res.status(200).json({
            success: true, 
            count: stores.length, 
            data: stores
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({error: 'Server Error'});
    }
};

// creat store
// @routes POST api/v1/stores
// access - public
exports.addStore = async (req, res, next) => {
    try {
        const store = await Store.create(req.body);
        res.status(200).json({
            success: true,
            data: store
        });
    } catch (err) {
        if (err.code === 11000){
            return res.status(400).json({error: 'Store already exists'});
        }
        res.status(400).json({error: `${err.message}`});
    }
};
