import CryptoJS from 'crypto-js';

// Define a fixed key (make sure to keep this secure and secret)
const key = CryptoJS.enc.Hex.parse('00112233445566778899AABBCCDDEEFF');

export const decryptName = (name, iv) => {
    if (iv && name) {
        const decryptedName = CryptoJS.TripleDES.decrypt({
            ciphertext: CryptoJS.enc.Base64.parse(name),
            key: key,
            iv: CryptoJS.enc.Hex.parse(iv)
        }).toString(CryptoJS.enc.Utf8);
        return decryptedName;
    }
    return name;
};
