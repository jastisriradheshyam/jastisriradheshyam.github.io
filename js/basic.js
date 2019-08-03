import { retriveLocalJSON } from "./retrive.js";
import { getInCurrentLang } from "./comman.js";

var getBasic = async function (callback) {
    global_basic = await retriveLocalJSON("basic");
    return;
};

var setBasic = function () {
    let nameElement = document.getElementById("name_text");
    nameElement.innerHTML = getInCurrentLang(global_basic.name);
};

var setMainHead = function() {
    let skillsElement = document.getElementById("skills_head");
    skillsElement.innerHTML = getInCurrentLang(global_basic.mainHead.skills);
    let socialElement = document.getElementById("social_head");
    socialElement.innerHTML = getInCurrentLang(global_basic.mainHead.social);
}

var setTitle = function() {
    document.title = getInCurrentLang(global_basic.name);
};

export {
    setTitle,
    getBasic,
    setBasic,
    setMainHead
};