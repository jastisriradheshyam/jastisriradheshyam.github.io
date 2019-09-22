import { getBasic, setBasic, setMainHead, setTitle } from "./basic.js";
import { setSiteLanguage } from './comman.js';
import { setLangBar } from './lang.js';
import { getSkillsList, setSkillsList } from "./skill.js";
import { getSocialList, setSocialList } from "./social.js";


var preload = async function () {
    try {
        await getBasic();
        await getSkillsList();
        await getSocialList();
        return null;
    } catch (error) {
        console.log(error);
    }
};

preload()
    .then(() => {
        changeLanguage();
    })
    .catch();

/**
 * change the language on click (button)
 * @param {Window Element Object} langObj 
 */
changeLanguageOnClick = function (langObj) {
    let lang = langObj.getAttribute("langCode");
    if (global_currentLanguage === lang) {
        return
    }
    changeLanguage(lang);
}

/**
 * change the sites language
 * @param {String} lang 
 */
changeLanguage = function (lang) {
    setSiteLanguage(lang);
    setTitle();
    setMainHead();
    setLangBar();
    setBasic();
    setSocialList();
    setSkillsList();
};

// event to monitor the location bar and change the content accordingly
// https://developer.mozilla.org/en-US/docs/Web/API/Window/popstate_event
window.addEventListener('popstate', (event) => {
    changeLanguage();
});