let session = {};

session.setMMTData = function (name, obj) {
    let val = JSON.stringify(obj);
    window.sessionStorage.setItem(name, val);
};
session.getMMTData = function (name) {
    let data = window.sessionStorage.getItem(name);
    return JSON.parse(data);
};
session.removeMMTData = function (name) {
    window.sessionStorage.removeItem(name);
};

export default session;
