/**
 * Created by user on 4/20/18.
 */
/*cred: email: "admin@gmail.com" , passwordHash: "$2b$10$nfeFc4EoUClztgFnxDKV1u46a2RjzhtYmVaOBEK1RmtJXzxATgdxm"*/
/*bcrypt password: "12345" (10symbols)*/
/*cred: email:test-test@gmail.com, password: "12345" */
/*confirmed email: test22@tes.ru, pwd: 12345*/
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import uniqueValidator from 'mongoose-unique-validator';

const schema = new mongoose.Schema(
    {
    email: { type: String, required: true, lowercase: true, index:true, unique:true },
    passwordHash: { type: String, required:true },
    confirmed: { type: Boolean, default: false},
    confirmationToken: {type: String, default: ""}
    },
    { timestamps: true}
);
/*почему то не работает*/
schema.methods.isValidPassword = function isValidPassword(password) {
    console.log("password: " + password + " hash: " + this.passwordHash);
    console.log("email:" + this.email );
    return bcrypt.compareSync(password, this.passwordHash);
};

schema.methods.setPassword = function setPassword(password) {
    this.passwordHash = bcrypt.hashSync(password, 10);
};

schema.methods.setConfirmationToken = function setConfirmationToken() {
    this.confirmationToken = this.generateJWT();
};

schema.methods.generateConfirmationUrl = function generateConfirmationUrl() {
    return `${process.env.HOST}/confirmation/${this.confirmationToken}`
};

schema.methods.generateResetPasswordLink = function generateResetPasswordLink() {
    return `${process.env.HOST}/reset_password/${this.generateResetPasswordToken()}`
};
/*Добавить генерацию токена для ресетпассворда*/
schema.methods.generateResetPasswordToken = function generateResetPasswordToken() {
    return jwt.sign({
        _id: this._id
    },
        process.env.JWT_SECRET,
        {expiresIn: "1h" }
    );
};

schema.methods.generateJWT = function generateJWT() {
    return jwt.sign({
        email: this.email,
        confirmed: this.confirmed
    }, process.env.JWT_SECRET);
};

schema.methods.toAuthJSON = function toAuthJson(){
  return {
      email: this.email,
      token: this.generateJWT(),
      confirmed: this.confirmed
  }
};
schema.plugin(uniqueValidator, {message: 'This email is already taken'});

export default mongoose.model("User", schema);