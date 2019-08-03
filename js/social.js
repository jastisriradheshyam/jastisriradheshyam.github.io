import { retriveLocalJSON } from "./retrive.js";
import { getInCurrentLang, removeChildElemets } from "./comman.js";

var getSocialList = async function (callback) {
    global_socialList = await retriveLocalJSON("social");
    return;
};

var setSocialList = function () {
    let socialListElement = document.getElementById("social_list");
    removeChildElemets(socialListElement);
    global_socialList.forEach(element => {
        let newSocialName = document.createElement("p");
        let newSocialLink = document.createElement("a");
        newSocialName.innerHTML = getInCurrentLang(element.name);
        newSocialLink.innerHTML = element.link;
        newSocialLink.setAttribute("href", element.link);
        let newSocialElement = document.createElement("li");
        newSocialElement.appendChild(newSocialName);
        newSocialElement.appendChild(newSocialLink);
        socialListElement.appendChild(newSocialElement);
    });
};


export {
    getSocialList,
    setSocialList
};