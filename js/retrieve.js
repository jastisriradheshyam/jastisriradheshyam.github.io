/**
 * retrieves local JSON file
 * @param {String} jsonFileName 
 * @param {Function} callback 
 */
const retrieveLocalJSON = function (jsonFileName, callback) {
    const promise = new Promise((resolve, reject) => {
        const fetchOptions = {
            headers: {
                "content-type": "application/json; charset=UTF-8",
                "pragma": "no-cache",
                "cache-control": "no-cache"
            },
            method: "GET"
        };
        fetch(`/data/${jsonFileName}.json`, fetchOptions)
            .then(data => data.json())
            .then(res => {
                return resolve(res);
            })
            .catch(error => {
                console.log(error);
                return reject(error);
            });
    });
    if (typeof callback === "function") {
        promise()
            .then(res => callback(res, null))
            .catch(err => callback(null, err))
    } else {
        return promise;
    }
};

export { retrieveLocalJSON };