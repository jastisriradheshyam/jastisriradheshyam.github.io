/**
 * Set the site language
 * @param {String} lang language code (Optional) 
 */
var setSiteLanguage = function (lang) {
    let languageCode = "";
    if (!lang) {
        let url = new URL(window.location.href);
        languageCode = url.searchParams.get("lang");
    } else {
        // change the language code in URL without reloading the webpage
        if (history.pushState) {
            var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?lang='+ lang;
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

var getInCurrentLang = function (someVar) {
    return someVar[global_currentLanguage] ? someVar[global_currentLanguage] : someVar[global_defaultLanguage];
};

var removeChildElements = function (parentElement) {
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