// import { removeChildElements } from './common.js';

const setLangBar = function () {
    const langElement = document.getElementById("lang");
    const langElementParentNode = langElement.parentNode;
    const newLangElement = langElement.cloneNode(false);
    const langFragment = document.createDocumentFragment();
    // removeChildElements(langElement);
    global_basic.supportedLanguages.forEach(element => {
        const newLangLink = document.createElement("Button");
        if (element.language != element.native) {
            newLangLink.innerHTML = `${element.native}/${element.language}`;
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