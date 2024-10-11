import UserModel from '../Models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if (user) {
            res.status(400).send('User already exists, you can login');
        } else {
            const newUser = new UserModel({ name, email, password });
            newUser.password = await bcrypt.hash(password, 10);
            await newUser.save();
            res.status(200).send('User created successfully');
        }
    } catch (error) {
        res.status(500).send(error);
    }
}
const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    try {
        if (!user) {
            res.status(403).send('User does not exist, you can signup');
        } else {
            const isMatch = await bcrypt.compare(password, user.password);
            if (isMatch) {
                const jwtToken = jwt.sign({email: user.email, _id: user._id}, 
                    process.env.JWT_SECRET,
                    {expiresIn: '1d'});

                    res.status(200).send({
                        message: "Login Success",
                        success: true,
                        jwtToken,
                        email,
                        name: user.name
                    })            } else {
                res.status(403).send('Invalid password');
            }
        }
    } catch (error) {
        res.status(500).send(error);
    }
}


export {signup, login};