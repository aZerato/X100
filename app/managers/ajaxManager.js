export default class AjaxManager {
   
    static ContentType = {
        Json: "application/json;charset=UTF-8",
        File: "multipart/form-data"
    };

    static send(method, url, contentType, data) {
        return new Promise((resolve, reject) => 
        {
            let req = new XMLHttpRequest();
            req.open(method, url);

            req.onload = () => {
                if (req.status == 200) {
                    resolve(req.response);
                }
                else {
                    reject(Error(req.statusText));
                }
            };

            req.onerror = function() {
                reject(Error("Network Error"));
            };

            req.setRequestHeader("Content-Type", contentType);

            req.send(data);
        });	
    }
}