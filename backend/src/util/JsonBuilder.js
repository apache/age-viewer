import Flavors from "../config/Flavors";

export function stringWrap(valstr, flavor){
    let valueWrapped = JSON.stringify(valstr);
    if (flavor === Flavors.AGENS) {
        valueWrapped = '\'' + valueWrapped.substring(1, valueWrapped.length - 1) + '\'';
    }
    return valueWrapped;
}

export function JsonStringify(flavor, record) {
    let ageJsonStr = '{';
    let isFirst = true;
    for (const [key, value] of Object.entries(record)) {
        if (!isFirst) {
            ageJsonStr = ageJsonStr + ',';
        }
        let valueWrapped = stringWrap(value, flavor);
        ageJsonStr = ageJsonStr + `${key}:${valueWrapped}`;
        isFirst = false;
    }
    ageJsonStr = ageJsonStr + '}';
    return ageJsonStr;
}

export async function createVertex(client, graphPathStr, label, record, flavor) {
    const createQ = `CREATE (n:${label} ${JsonStringify(flavor, record)})`;
    if (flavor === 'AGE') {
        return AGECreateVertex(client, graphPathStr, createQ);
    } else {
        return AgensGraphCreateVertex(client, graphPathStr, createQ);
    }
}

async function AgensGraphCreateVertex(client, graphPathStr, createQ) {
    await client.query(createQ);
}

async function AGECreateVertex(client, graphPathStr, createQ) {
    await client.query(
        `select *
         from cypher('${graphPathStr}', $$ ${createQ} $$) as (a agtype)`);
}

export async function createEdge(client, label, record, graphPathStr, edgeStartLabel, edgeEndLabel, startNodeName, endNodeName, flavor) {
    const createQ = `CREATE (:${edgeStartLabel} {name: ${stringWrap(startNodeName, flavor)}})-[n:${label} ${JsonStringify(flavor, record)}]->(:${edgeEndLabel} {name: ${stringWrap(endNodeName, flavor)}})`;
    if (flavor === 'AGE') {
        return AGECreateEdge(client, graphPathStr, createQ);
    } else {
        return AgensGraphCreateEdge(client, graphPathStr, createQ);
    }
}

async function AgensGraphCreateEdge(client, graphPathStr, createQ) {
    await client.query(createQ);
}

async function AGECreateEdge(client, graphPathStr, createQ) {
    await client.query(
        `select *
         from cypher('${graphPathStr}', $$ ${createQ} $$) as (a agtype)`);
}
