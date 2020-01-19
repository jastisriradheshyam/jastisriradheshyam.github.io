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
        let newSocialElementSpan = document.createElement("span");
        newSocialElementSpan.classList.add('socialSpan')
        let newSocialName = document.createElement("span");
        let newSocialLink = document.createElement("a");

        // ***** image [ start ] *****
        let newSocialLogo = document.createElement("img");
        newSocialLogo.setAttribute("src", element.logo);
        newSocialLogo.setAttribute("class", "socialLogo");
        // ***** image [ end ] *****

        // social platform name
        newSocialName.innerHTML = getInCurrentLang(element.name);

        // ***** social link [ start ] *****
        // newSocialLink.innerHTML = element.link;
        newSocialLink.setAttribute("href", element.link);
        // ***** social link [ end ] *****

        // ***** top social element [ start ] *****
        let newSocialElement = document.createElement("li");
        newSocialLink.appendChild(newSocialLogo);
        newSocialLink.appendChild(newSocialName);
        newSocialElementSpan.appendChild(newSocialLink)
        newSocialElement.appendChild(newSocialElementSpan);
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