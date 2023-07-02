import { retrieveLocalJSON } from './retrieve.js';
import { getInCurrentLang } from "./common.js";

const getSkillsList = async function (callback) {
    const skills = await retrieveLocalJSON("skills");
    global_skillTypeList = skills.type;
    global_skillsList = skills.skills;
    return;
};

const setSkillsList = function () {
    const skillsListElement = document.getElementById("skills_list");
    const parentElement = skillsListElement.parentNode;
    const newSkillsNode = skillsListElement.cloneNode(false);
    const skillsListFragment = document.createDocumentFragment();
    global_skillsList.forEach(element => {
        const newSkillElement = document.createElement("li");
        const span = document.createElement("span");
        span.innerHTML = getInCurrentLang(element.name);
        span.classList.add("listText")
        newSkillElement.appendChild(span);
        skillsListFragment.appendChild(newSkillElement);
    });
    newSkillsNode.appendChild(skillsListFragment);
    parentElement.replaceChild(newSkillsNode, skillsListElement);
};

export {
    getSkillsList,
    setSkillsList
};