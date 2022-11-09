var aes256 = require('aes256');

var key = 'akfuhkjeaugf3u2yr32yu';
var plaintext =
{
    "vendorCode": "blueDart",
    "vendorKey": "akfuhkjeaugf3u2yr32yu",
    "exp": Date.now() + (60 * 1000)
};

var encryptedPlainText = aes256.encrypt(key, JSON.stringify(plaintext));
console.log("data", encryptedPlainText);