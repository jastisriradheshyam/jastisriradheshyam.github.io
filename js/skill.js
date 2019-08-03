import { retriveLocalJSON } from './retrive.js';
import { getInCurrentLang, removeChildElemets } from "./comman.js";

var getSkillsList = async function (callback) {
    let skills = await retriveLocalJSON("skills");
    global_skillTypeList = skills.type;
    global_skillsList = skills.skills;
    return;
};

var setSkillsList = function () {
    let skillsListElement = document.getElementById("skills_list");
    removeChildElemets(skillsListElement);
    global_skillsList.forEach(element => {
        let newSkillElement = document.createElement("li");
        skillsListElement.appendChild(newSkillElement);
        newSkillElement.innerHTML = getInCurrentLang(element.name);
    });
};

export {
    getSkillsList,
    setSkillsList
};