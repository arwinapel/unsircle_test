const Users = require("../models/users.model");
const uuid = require("uuid");

function generateOTP() {
    var digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < 4; i++) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
}

exports.register = (req, res) => {
    const data = req.body;
    let user = new Users();
    let findUser = Users.findOne({email: data.email});
    if (findUser) {
        res.send("User already exists")
    } else {
        user.email = data.email;
        user.password = data.password;
        user.verificationCode = generateOTP();
        user.save((err) => {
            if (err) {
                return next(err);
            }
            // TODO send mail
            res.send("User created")
        })
    }
};

exports.login = (req, res) => {
    const data = req.body;
    //TODO find user in redis
    let findUser = Users.findOne({email: data.email, password: data.password});
    if (findUser) {
        res.send(findUser);
    } else {
        res.send("User not found");
    }
}