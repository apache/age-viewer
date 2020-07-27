class DatabaseInfo {
    constructor({host, port, database, user, password, graph}) {
        this._host = host;
        this._port = port;
        this._database = database;
        this._user = user;
        this._password = password;
        this._graph = graph;
    }

    get host() {
        return this._host;
    }
    set host(host) {
        this._host = host;
    }
    get port() {
        return this._port;
    }
    set port(port) {
        this._port = port;
    }
    get database() {
        return this._database
    }
    set database(database) {
        this._database = database
    }
    get graph() {
        return this._graph;
    }
    set graph(graph) {
        this._graph = graph
    }
    get user() {
        return this._user
    }
    set user(user) {
        this._user = user
    }
    get password() {
        return this._password
    }
    set password(password) {
        this._password = password
    }

    toObject() {
        return {
            host: this._host,
            port: this._port,
            database: this._database,
            user: this._user,
            password: this._password,
            graph: this._graph
        }
    }

    validate() {
        if(!this._host || !this._database || !this._graph || !this._user || !this._password) {
            throw 'NotValidData';
        }
    }
}

module.exports = DatabaseInfo;