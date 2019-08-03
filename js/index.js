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
        setSiteLanguage();
        setTitle();
        setMainHead();
        setLangBar();
        setBasic();
        setSocialList();
        setSkillsList();
    })
    .catch();

changeLanguage = function (langObj) {
    let lang = langObj.getAttribute("langCode");
    if (global_currentLanguage === lang) {
        return
    }
    setSiteLanguage(lang);
    setTitle();
    setMainHead();
    setLangBar();
    setBasic();
    setSocialList();
    setSkillsList();
};