// importing openpgp scripts as globals to web workers
importScripts('/js/libraries/openpgp.min.js');

let publicKey = null;

/**
 * retrieve the public key if not available
 */
const getPublicKey = async function () {
    if (publicKey == null) {
        const response = await fetch('/data/pgp/key.pub');
        publicKey = await response.text();
    }
    return publicKey;
};

self.addEventListener('message', async (e) => {
    const message = e.data;
    const publicKey = await getPublicKey();
    const options = {
        message: openpgp.message.fromText(message),       // input as Message object
        publicKeys: (await openpgp.key.readArmored(publicKey)).keys // for encryption
    }

    openpgp.encrypt(options).then(cipherText => {
        return cipherText.data // '-----BEGIN PGP MESSAGE ... END PGP MESSAGE-----'
    }).then((encryptedText) => {
        self.postMessage(encryptedText);
    });
});
