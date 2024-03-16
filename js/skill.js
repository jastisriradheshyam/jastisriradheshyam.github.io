import { retrieveLocalJSON } from './retrieve.js';
import { getInCurrentLang } from "./common.js";

const getSkillsList = async function (callback) {
    const skills = await retrieveLocalJSON("skills");
    global_skillTypeList = skills.type;
    global_relevanceList = skills.relevance;
    global_skillsList = skills.skills;
    return;
};

const getFormattedSkillTypeList = function (typeList) {
    if (!Array.isArray(typeList)) return "";
    let formattedListStr = "[ ";
    typeList.forEach((type, index) => {
        formattedListStr += getInCurrentLang(global_skillTypeList[type].name);
        if (index + 1 < typeList.length) formattedListStr += " ,";
    });
    formattedListStr += " ]";
    return formattedListStr;
}

const getFormattedSkillRelevanceList = function (relevanceList) {
    const patentSpan = document.createElement("span");
    patentSpan.style.background = "orange";
    patentSpan.style.borderRadius = "1em";
    if (!Array.isArray(relevanceList)) return patentSpan;
    const openBracketSpan = document.createElement("span")
    openBracketSpan.innerText = "( ";
    patentSpan.appendChild(openBracketSpan);
    relevanceList.forEach((type, index) => {
        const span = document.createElement("span");
        span.innerHTML = getInCurrentLang(global_relevanceList[type].name);
        span.style.color = global_relevanceList[type].color;
        patentSpan.appendChild(span);
        if (index + 1 < relevanceList.length) {
            const span = document.createElement("span");
            span.innerText = " ,";
            patentSpan.appendChild(span);
        } 
    });
    const closeBracketSpan = document.createElement("span")
    closeBracketSpan.innerText = " )";
    patentSpan.appendChild(closeBracketSpan);
    return patentSpan;
}

const setSkillsList = function () {
    const skillsListElement = document.getElementById("skills_list");
    const parentElement = skillsListElement.parentNode;
    const newSkillsNode = skillsListElement.cloneNode(false);
    const skillsListFragment = document.createDocumentFragment();
    global_skillsList.forEach(element => {
        const newSkillElement = document.createElement("li");
        const span = document.createElement("span");
        const skillNameSpan = document.createElement("span");
        skillNameSpan.style.fontWeight = "bold";
        skillNameSpan.innerHTML = getInCurrentLang(element.name) + " ";
        span.classList.add("listText");
        span.appendChild(skillNameSpan);
        span.appendChild(getFormattedSkillRelevanceList(element.relevances));
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