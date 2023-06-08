const Categories = require('../models/categories');

exports.category = async(req, res, next) => {

    const { category } = req.body;
    console.log(category);
    const catExists = await Categories.findOne({ category });

    if (catExists) {
        return res.status(400).json({ success: false, message: 'category is exist!' });
    }
    try {
        const user = await Categories.create(req.body);
        res.status(201).json({ success: true, user });
    } catch (error) {
        console.log(error);
        res.status(400).json({ success: false, message: error.message });
    }
};