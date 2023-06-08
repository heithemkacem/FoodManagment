const Client = require('../models/client');

exports.signup = async(req, res, next) => {

    const { email } = req.body;
    console.log(email);
    const userExists = await Client.findOne({ email });

    if (userExists) {
        return res.status(400).json({ success: false, message: 'Email is taken!' });
    }
    try {
        const user = await Client.create(req.body);
        res.status(201).json({ success: true, user });
    } catch (error) {
        console.log(error);
        res.status(400).json({ success: false });
    }
};


exports.login = async(req, res) => {
    console.log(req.body);

    // res.status(200).json({ success: true, message: 'Login successful!' });
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'Email and password are required!' });
        }

        // Check for existing user
        const user = await Client.findOne({ email });

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found!' });
        }

        // verify user password
        const isMatched = await user.comparePassword(password);
        if (!isMatched) {

            return next(new ErrorResponse('Invalid credentials', 400))
        }

        return res.status(200).json({ success: true, user });


    } catch (error) {
        console.log(error);
        return res.status(400).json({ success: false, message: error.message });
    }
};