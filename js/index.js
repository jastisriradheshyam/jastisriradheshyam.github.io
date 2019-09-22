import { getBasic, setBasic, setMainHead, setTitle } from "./basic.js";
import { setSiteLanguage } from './comman.js';
import { setLangBar } from './lang.js';
import { getSkillsList, setSkillsList } from "./skill.js";
import { getSocialList, setSocialList } from "./social.js";
import { removeChildElemets } from './comman.js';

// ***** preloading effect setup [ start ] *****
var circle = document.getElementById('preloading_circle');
var radius = circle.r.baseVal.value;
var circumference = radius * 2 * Math.PI;

circle.style.strokeDasharray = `${circumference} ${circumference}`;
circle.style.strokeDashoffset = `${circumference}`;

var setProgress = function (percent) {
    const offset = circumference - percent / 100 * circumference;
    circle.style.strokeDashoffset = offset;
}
// ***** preloading effect setup [ end ] *****

var preload = async function () {
    try {
        setProgress(25);
        await getBasic();
        setProgress(50);
        await getSkillsList();
        setProgress(75);
        await getSocialList();
        setProgress(100);
        return null;
    } catch (error) {
        console.log(error);
    }
};

preload()
    .then(() => {
        // ***** removing preloading elements [ start ] *****
        let preloadingElments = document.getElementById('preloading');
        removeChildElemets(preloadingElments);
        preloadingElments.remove();
        // ***** removing preloading elements [ end ] *****
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