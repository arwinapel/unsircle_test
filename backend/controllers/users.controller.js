const Users = require("../models/users.model");
const uuid = require("uuid");

const findUser = async (email) => {
    return await Users.findOne({email: email});
};

function generateOTP() {
    var digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < 4; i++) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
}

exports.register = async (req, res, next) => {
    const data = req.body;
    let user = new Users();
    try {
        const findUser = await Users.findOne({email: data.email})
        if (findUser) {
            res.status(400).send("User already exists");
        } else {
            user.email = data.email;
            user.password = data.password;
            user.verificationCode = generateOTP();
            await user.save()
            res.send(user)
        }
    } catch (e) {
        console.log(e)
        res.status(500).send("Internal Server Error")
    }
};

exports.login = async (req, res, next) => {
    const data = req.body;
    //TODO find user in redis
    try {
        const user = await Users.findOne({email: data.email, password: data.password});
        if (user) {
            res.send(user);
        } else {
            res.status(400).send("User not found")
        }
    } catch (e) {
        console.log(e)
        res.status(500).send("Internal Server Error")
    }
}