import { removeChildElemets } from './comman.js';

var setLangBar = function () {
    let langElement = document.getElementById("lang");
    removeChildElemets(langElement);
    global_basic.supportedLanguages.forEach(element => {
        let newLangLink = document.createElement("Button");
        if (element.language != element.native) {
            newLangLink.innerHTML = `${element.language}/${element.native}`;
        } else {
            newLangLink.innerHTML = `${element.language}`;
        }

        newLangLink.setAttribute("onclick", "changeLanguageOnClick(this)");
        newLangLink.setAttribute("langCode", element.code);
        newLangLink.setAttribute("class", "langElement");
        langElement.appendChild(newLangLink);
    });
};

export { setLangBar };