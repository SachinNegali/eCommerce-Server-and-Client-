const mongoose = require("mongoose");
const crypto = require("crypto");
const uuidv1 = require("uuid/v1");
//var CryptoJS = require("crypto-js");

var userSchema = mongoose.Schema(
    {
    name : {
        type: String,
        required: true,
        maxlen: 32,
        trim: true
    },
    lastName: {
        type: String,
        maxlen: 32,
        trim: true
    },
    email: {
        type: String,
        trim: true,
        unique:true,
        required: true
    },
    userinfo: {
        type: String,
        trim: true
    },
    encry_password: {
        type:String,
        required: true
    }, 
    salt: String,
    role: {
        type: Number,
        default: 0
      },
    purchse: {
        type: Array,
        default: []
    }

 }, 
    {timestamps: true}

);



userSchema
  .virtual("password")
  .set(function(password) {
    this._password = password;
    this.salt = uuidv1();
    this.encry_password = this.securePassword(password);
  })
  .get(function() {
    return this._password;
  });

userSchema.methods = {
  authenticate: function(plainpassword) {
    return this.securePassword(plainpassword) === this.encry_password;
  },

  securePassword: function(plainpassword) {
    if (!plainpassword) return "";
    try {
      return crypto
        .createHmac("sha256", this.salt)
        .update(plainpassword)
        .digest("hex");
    } catch (err) {
      return "";
    }
  }
};

module.exports = mongoose.model("User", userSchema);