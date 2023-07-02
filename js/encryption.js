import { retrieveLocalJSON } from './retrieve.js';
import { getInCurrentLang } from "./common.js";
const worker = new Worker('./js/enc_worker.js');

const encryptionButton = document.getElementById('encrypt_button');
const encryptedData = document.getElementById('encrypted_data');
const encryptedDataCopyButton = document.getElementById('encrypted_data_copy_button');
encryptionButton.addEventListener("click", async () => {
    const message = document.getElementById("plainText").value;
    worker.postMessage(message);
    worker.addEventListener('message', function (e) {
        encryptedData.innerHTML = e.data;
        encryptedDataCopyButton.removeAttribute("hidden");
    });
});
encryptedDataCopyButton.addEventListener("click", ()=> {
    navigator.clipboard.writeText(encryptedData.innerText);
});

/**
 * get the encryption visual data
 */
const getEncryption = async function () {
    const encryption = await retrieveLocalJSON("encryption");
    global_encryption = encryption;
    return;
};

/**
 * get the encryption visual data
 */
const setEncryption = function () {
    document.getElementById("encrypt_button").innerHTML = getInCurrentLang(global_encryption.encrypt);
    encryptedDataCopyButton.innerHTML = getInCurrentLang(global_encryption.encryptDataCopyButton);
};

export {
    getEncryption,
    setEncryption
};