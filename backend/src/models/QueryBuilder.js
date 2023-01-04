

class QueryBuilder {

    constructor({graphName, returnAs='x'}={}){
        this._graphName = graphName;
        this.ends = {
            start:`SELECT * FROM cypher('${this._graphName}', $$`,
            end:`$$) as (${returnAs} agtype);`
        };
        this.clause = '';
        this.middle = [];
    }

    startQuery(startQuery){
        this.ends.start = startQuery;
    }

    insertQuery(clause){
        this.middle.push(clause);
    }
    create(){
        this.clause = 'CREATE '
    }
    endQuery(endQuery){
        this.ends.end = endQuery;
    }

    getGeneratedQuery(){
        return ((
            this.ends.start +
            this.clause +
            this.middle.join(', ')+
            this.ends.end).trim());
    }
}

module.exports = QueryBuilder;