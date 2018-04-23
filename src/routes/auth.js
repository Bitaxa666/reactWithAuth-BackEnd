/**
 * Created by user on 4/20/18.
 */
import express from 'express';
import User from '../models/User';

const router = express.Router();

router.post('/', (req, res) => {
    const { credentials } = req.body;
    User.findOne({ email: credentials.email })
        .then(user => {
            if (user && user.isValidPassword(credentials.password)){ /*Don't work function: This error means one of the first 2 params are either null or undefined.*/
            /*if (user){*/
                res.json({ user: user.toAuthJSON() });

            } else {
                res.status(400).json({ errors: {global: "Invalid credentials"}});
            }
        });
});
router.post("/confirmation", (req, res) => {
    const token = req.body.token;
    User.findOneAndUpdate(
        { confirmationToken: token },
        { confirmationToken: "", confirmed: true },
        { new: true }
    ).then(
        user =>
            user ? res.json({ user: user.toAuthJSON() }) : res.status(400).json({})
    );
});

export default router;