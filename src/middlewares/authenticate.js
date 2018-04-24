/**
 * Created by user on 4/24/18.
 */
import jwt from 'jsonwebtoken';
import User from '../models/User';

export default (req, res, next) => {
    const header = req.headers.authorization;
    let token;

    if(header) token = header.split(" ")[1];

    if(token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if(err) {
                res.status(401).json({ errors: { global: "Invalid token"}});
                console.log("jwt is: " + token);
            } else {
                User.findOne({ email: decoded.email }).then( user => {
                    req.currentUser = user;
                    next();
                });
            }
        });
    } else {
        res.status(401).json({ errors: {global: "No token"}});
        console.log("jwt is: " + token);
        console.log("header is: " + header);
        console.log("req is: " + req.headers.authorization);
    }
}