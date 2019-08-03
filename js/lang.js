import { removeChildElemets } from './comman.js';

var setLangBar = function () {
    let langElement = document.getElementById("lang");
    removeChildElemets(langElement);
    global_basic.supportedLanguages.forEach(element => {
        let newLangLink = document.createElement("Button");
        newLangLink.innerHTML = ` ${element.language} `;
        // newLangLink.setAttribute("href", `?lang=${element.code}`);
        newLangLink.setAttribute("onclick", "changeLanguage(this)");
        newLangLink.setAttribute("langCode", element.code);
        newLangLink.setAttribute("class", "langElement");
        langElement.appendChild(newLangLink);
    });
};

export { setLangBar };