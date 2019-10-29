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
    let parentElement = skillsListElement.parentNode;
    let newSkillsNode = skillsListElement.cloneNode(false);
    let skillsListFragment = document.createDocumentFragment();
    global_skillsList.forEach(element => {
        let newSkillElement = document.createElement("li");
        newSkillElement.innerHTML = getInCurrentLang(element.name);
        skillsListFragment.appendChild(newSkillElement);
    });
    newSkillsNode.appendChild(skillsListFragment);
    parentElement.replaceChild(newSkillsNode, skillsListElement);
};

export {
    getSkillsList,
    setSkillsList
};