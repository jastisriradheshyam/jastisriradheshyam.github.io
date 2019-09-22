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
        
        // ***** image [ start ] *****
        let newSocialLogo = document.createElement("img");
        newSocialLogo.setAttribute("src",element.logo);
        newSocialLogo.setAttribute("class","socialLogo");
        // ***** image [ end ] *****

        // social platform name
        newSocialName.innerHTML = getInCurrentLang(element.name);
        
        // ***** soical link [ start ] *****        
        newSocialLink.innerHTML = element.link;
        newSocialLink.setAttribute("href", element.link);
        // ***** soical link [ end ] *****        
        
        // ***** top social element [ start ] *****
        let newSocialElement = document.createElement("li");
        newSocialElement.appendChild(newSocialName);
        newSocialElement.appendChild(newSocialLogo);
        newSocialElement.appendChild(newSocialLink);
        socialListElement.appendChild(newSocialElement);
        // ***** top social element [ end ] *****

    });
};


export {
    getSocialList,
    setSocialList
};