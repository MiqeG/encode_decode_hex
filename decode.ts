

const secret = "SECRET"
import  CryptoJS  from "crypto-js"
export const encode = function (plainText: string): string {
    if (typeof plainText != 'string') throw "ENCODING INPUT NOT A STRING"
    var b64 = CryptoJS.AES.encrypt(plainText, secret).toString();
    var e64 = CryptoJS.enc.Base64.parse(b64);
    var eHex = e64.toString(CryptoJS.enc.Hex);
    return eHex;
}
export const decode = function (cipherText: string): string {
    if (typeof cipherText != 'string') throw "DECODING INPUT NOT A STRING"
    var reb64 = CryptoJS.enc.Hex.parse(cipherText);
    var bytes = reb64.toString(CryptoJS.enc.Base64);
    var decrypt = CryptoJS.AES.decrypt(bytes, secret);
    var plain = decrypt.toString(CryptoJS.enc.Utf8);
    return plain;
}