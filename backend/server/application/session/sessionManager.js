class SessionManager {
    constructor() {
        this._sessionMap = new Map();
    }

    put(key, value) {
        this._sessionMap.set(key, value);
    }

    get(key) {
        if(!this._sessionMap.get(key)) {
            return null;
        }
        return this._sessionMap.get(key);
    }
}
const sessionManager = new SessionManager();

module.exports = sessionManager;