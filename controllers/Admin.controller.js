const Admin = require("../models/Admin.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.createAdmin = async (req, res) => {
    try {
        let { name, email, password } = req.body;

        let adminExist = await Admin.findOne({ email: email });
        if (adminExist)
            return res.status(403).json({
                errorcode: 2,
                status: false,
                message: "Email already in use",
                data: null,
            });

        const hashedPassword = bcrypt.hashSync(password);

        let admin = new Admin({
            image: req.file && req.file.location ? req.file.location : null,
            name,
            email,
            password: hashedPassword,
        });

        admin = await admin.save();

        return res.status(201).json({
            errorcode: 0,
            status: true,
            message: "Admin Added Successfully",
            data: admin,
        });
    } catch (error) {
        return res.status(500).json({
            errorcode: 5,
            status: false,
            message: error.message,
            data: error,
        });
    }
};

exports.adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        let existingAdmin = await Admin.findOne({ email: email });
        if (!existingAdmin)
            return res.status(403).json({
                errorcode: 2,
                status: false,
                message: "Email doesn't exists",
                data: null,
            });

        let cmpPassword = bcrypt.compareSync(password, existingAdmin.password);
        if (!cmpPassword) {
            return res.status(404).json({
                errorcode: 3,
                status: false,
                message: "Incorrect Password",
                data: null,
            });
        } else {
            const token = jwt.sign({ adminid: existingAdmin }, process.env.JWT_SECRET, { expiresIn: "30s" });
            existingAdmin = { ...existingAdmin._doc, password: null, token };
            res.cookie(String(existingAdmin._id), token, {
                path: "/",
                expires: new Date(Date.now() + 1000 * 30),
                httpOnly: true,
                sameSite: "lax",
            });
            return res.status(200).json({
                errorcode: 0,
                status: true,
                message: "Admin Login Successfully",
                data: existingAdmin,
            });
        }
    } catch (error) {
        return res.status(500).json({
            errorcode: 5,
            status: false,
            message: error.message,
            data: error,
        });
    }
};
