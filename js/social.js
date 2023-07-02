import { retrieveLocalJSON } from "./retrieve.js";
import { getInCurrentLang } from "./common.js";

const getSocialList = async function (callback) {
    global_socialList = await retrieveLocalJSON("social");
    return;
};

const setSocialList = function () {
    const socialListElement = document.getElementById("social_list");
    const socialListParentNode = socialListElement.parentNode;

    const newSocialListElement = socialListElement.cloneNode(false);
    const socialListFragment = document.createDocumentFragment();

    global_socialList.forEach(element => {
        const newSocialElementSpan = document.createElement("span");
        newSocialElementSpan.classList.add('socialSpan')
        const newSocialName = document.createElement("span");
        const newSocialLink = document.createElement("a");

        // ***** image [ start ] *****
        const newSocialLogo = document.createElement("img");
        newSocialLogo.setAttribute("src", element.logo);
        newSocialLogo.setAttribute("class", "socialLogo");
        // ***** image [ end ] *****

        // social platform name
        newSocialName.innerHTML = getInCurrentLang(element.name);
        newSocialName.classList.add('socialTitle');

        // ***** social link [ start ] *****
        // newSocialLink.innerHTML = element.link;
        newSocialLink.setAttribute("href", element.link);
        newSocialLink.classList.add('socialLink');
        // ***** social link [ end ] *****

        // ***** top social element [ start ] *****
        const newSocialElement = document.createElement("li");
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