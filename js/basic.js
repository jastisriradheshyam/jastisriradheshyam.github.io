import { retrieveLocalJSON } from "./retrieve.js";
import { getInCurrentLang } from "./common.js";

const getBasic = async function (callback) {
    global_basic = await retrieveLocalJSON("basic");
    return;
};

const setBasic = function () {
    const nameElement = document.getElementById("name_text");
    nameElement.innerHTML = getInCurrentLang(global_basic.name);
};

const setMainHead = function() {
    const skillsElement = document.getElementById("skills_head");
    skillsElement.innerHTML = getInCurrentLang(global_basic.mainHead.skills);
    const socialElement = document.getElementById("social_head");
    socialElement.innerHTML = getInCurrentLang(global_basic.mainHead.social);
    const encryptionElement = document.getElementById("encryption_head");
    encryptionElement.innerHTML = getInCurrentLang(global_basic.mainHead.encryption);
}

const setTitle = function() {
    document.title = getInCurrentLang(global_basic.name);
};

export {
    setTitle,
    getBasic,
    setBasic,
    setMainHead
};