class ResponseModel {
    constructor(message, data) {
        this._message = message;
        this._data = data;
    }

    get message() {
        return this._message;
    }

    set message(message) {
        if (!message) {
            message = '';
        }
        this._message = message;
    }

    get data() {
        return this._data;
    }

    set data(data) {
        this._data = data;
    }

    toJSON() {
        return {
            message: this._message,
            data: this._data
        }
    }
}

module.exports = ResponseModel;