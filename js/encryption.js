import { retrieveLocalJSON } from './retrieve.js';
import { getInCurrentLang } from "./common.js";
var worker = new Worker('./js/enc_worker.js');

let encryptionButton = document.getElementById('encrypt_button');
encryptionButton.addEventListener("click", async () => {
    let message = document.getElementById("plainText").value;
    worker.postMessage(message);
    worker.addEventListener('message', function (e) {
        document.getElementById('encrypted_data').innerHTML = e.data
    });
});

/**
 * get the encryption visual data
 */
var getEncryption = async function () {
    let encryption = await retrieveLocalJSON("encryption");
    global_encryption = encryption;
    return;
};

/**
 * get the encryption visual data
 */
var setEncryption = function () {
    document.getElementById("encrypt_button").innerHTML = getInCurrentLang(global_encryption.encrypt);
};

export {
    getEncryption,
    setEncryption
};