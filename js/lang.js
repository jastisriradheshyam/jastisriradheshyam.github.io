import { removeChildElements } from './common.js';

var setLangBar = function () {
    let langElement = document.getElementById("lang");
    let langElementParentNode = langElement.parentNode;
    let newLangElement = langElement.cloneNode(false);
    let langFragment = document.createDocumentFragment();
    // removeChildElements(langElement);
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
        langFragment.appendChild(newLangLink);
    });
    newLangElement.appendChild(langFragment);
    langElementParentNode.replaceChild(newLangElement, langElement);
};

export { setLangBar };