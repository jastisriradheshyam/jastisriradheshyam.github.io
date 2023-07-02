/**
 * Set the site language
 * @param {String} lang language code (Optional) 
 */
const setSiteLanguage = function (lang) {
    let languageCode = "";
    if (!lang) {
        const url = new URL(window.location.href);
        languageCode = url.searchParams.get("lang");
    } else {
        // change the language code in URL without reloading the webpage
        if (history.pushState) {
            const newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?lang='+ lang;
            window.history.pushState({path:newurl},'',newurl);
        }
        languageCode = lang;
    }
    global_basic.supportedLanguages.forEach(element => {
        if (element.code === languageCode) {
            global_currentLanguage = languageCode;
        }
    });
};

const getInCurrentLang = function (someVar) {
    return someVar[global_currentLanguage] ? someVar[global_currentLanguage] : someVar[global_defaultLanguage];
};

const removeChildElements = function (parentElement) {
    while (parentElement.firstChild) {
        removeChildElements(parentElement.firstChild);
        parentElement.removeChild(parentElement.firstChild);
    }
};

export {
    setSiteLanguage,
    getInCurrentLang,
    removeChildElements
};