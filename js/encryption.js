import { retrieveLocalJSON } from './retrieve.js';
import { getInCurrentLang } from "./common.js";

var publicKey = null;

let encryptionButton = document.getElementById('encrypt_button');
encryptionButton.addEventListener("click", async () => {
    let message = document.getElementById("plainText").value;
    await getPublicKey();
    const options = {
        message: openpgp.message.fromText(message),       // input as Message object
        publicKeys: (await openpgp.key.readArmored(publicKey)).keys // for encryption
        // privateKeys: [privKeyObj]                                 // for signing (optional)
    }

    openpgp.encrypt(options).then(cipherText => {
        return cipherText.data // '-----BEGIN PGP MESSAGE ... END PGP MESSAGE-----'
    }).then((encryptedText) => {
        document.getElementById('encrypted_data').innerHTML = encryptedText
    })
});

var getPublicKey = async function () {
    if (publicKey == null) {
        let response = await fetch('./data/pgp/key.pub');
        publicKey = await response.text();
    }
    return publicKey;
};

var getEncryption = async function () {
    let encryption = await retrieveLocalJSON("encryption");
    global_encryption = encryption;
    return;
};

var setEncryption = function () {
    document.getElementById("encrypt_button").innerHTML = getInCurrentLang(global_encryption.encrypt);
};

export {
    getEncryption,
    setEncryption
};