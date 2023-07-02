import { getBasic, setBasic, setMainHead, setTitle } from "./basic.js";
import { setSiteLanguage, removeChildElements } from './common.js';
import { setLangBar } from './lang.js';
import { getSkillsList, setSkillsList } from "./skill.js";
import { getSocialList, setSocialList } from "./social.js";
import { getEncryption, setEncryption } from "./encryption.js";

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
        let totalProgress = 0;
        const updateProgress = (progressInc) => {
            totalProgress = totalProgress + progressInc;
            setProgress(totalProgress);
        }
        updateProgress(25);
        await getBasic();
        updateProgress(25);
        const skillsPromise = getSkillsList().then(() => {
            updateProgress(25);
        });
        await Promise.allSettled([
            skillsPromise,
            getSocialList(),
            getEncryption()
        ])
        setProgress(100);
        return null;
    } catch (error) {
        console.log(error);
    }
};

preload()
    .then(() => {
        // ***** removing preloading elements [ start ] *****
        let preloadingElements = document.getElementById('preloading');
        removeChildElements(preloadingElements);
        preloadingElements.remove();
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
    setEncryption();
};

// event to monitor the location bar and change the content accordingly
// https://developer.mozilla.org/en-US/docs/Web/API/Window/popstate_event
window.addEventListener('popstate', (event) => {
    changeLanguage();
});