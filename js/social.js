import { retrieveLocalJSON } from "./retrieve.js";
import { getInCurrentLang, removeChildElements } from "./common.js";

var getSocialList = async function (callback) {
    global_socialList = await retrieveLocalJSON("social");
    return;
};

var setSocialList = function () {
    let socialListElement = document.getElementById("social_list");
    let socialListParentNode = socialListElement.parentNode;

    let newSocialListElement = socialListElement.cloneNode(false);
    let socialListFragment = document.createDocumentFragment();

    global_socialList.forEach(element => {
        let newSocialName = document.createElement("p");
        let newSocialLink = document.createElement("a");

        // ***** image [ start ] *****
        let newSocialLogo = document.createElement("img");
        newSocialLogo.setAttribute("src", element.logo);
        newSocialLogo.setAttribute("class", "socialLogo");
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
        socialListFragment.appendChild(newSocialElement);
        // ***** top social element [ end ] *****
    });
    newSocialListElement.appendChild(socialListFragment);
    socialListParentNode.replaceChild(newSocialListElement, socialListElement);
};


export {
    getSocialList,
    setSocialList
};