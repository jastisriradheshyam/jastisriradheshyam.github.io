import { getBasic, setBasic, setMainHead, setTitle } from "./basic.js";
import { setSiteLanguage, removeChildElements } from './common.js';
import { setLangBar } from './lang.js';
import { getSkillsList, setSkillsList } from "./skill.js";
import { getSocialList, setSocialList } from "./social.js";
import { getEncryption, setEncryption } from "./encryption.js";

// ***** preloading effect setup [ start ] *****
const circle = document.getElementById('preloading_circle');
const radius = circle.r.baseVal.value;
const circumference = radius * 2 * Math.PI;

circle.style.strokeDasharray = `${circumference} ${circumference}`;
circle.style.strokeDashoffset = `${circumference}`;

const setProgress = function (percent) {
    const offset = circumference - percent / 100 * circumference;
    circle.style.strokeDashoffset = offset;
}
// ***** preloading effect setup [ end ] *****

const preload = async function () {
    try {
        let totalProgress = 0;
        const updateProgress = (progressInc) => {
            totalProgress = totalProgress + progressInc;
            setProgress(totalProgress);
        }
        updateProgress(20);
        await getBasic();
        updateProgress(20);
        await Promise.allSettled([
            getSkillsList().then(() => {
                updateProgress(20);
            }),
            getSocialList().then(() => {
                updateProgress(20);
            }),
            getEncryption().then(() => {
                updateProgress(20);
            })
        ])
        // setProgress(100);
        return null;
    } catch (error) {
        console.log(error);
    }
};

preload()
    .then(() => {
        // ***** removing preloading elements [ start ] *****
        const preloadingElements = document.getElementById('preloading');
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
    const lang = langObj.getAttribute("langCode");
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