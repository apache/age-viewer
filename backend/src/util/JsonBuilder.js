export function AGEJsonStringify(record) {
    let ageJsonStr = '{';
    let isFirst = true;
    for (const [key, value] of Object.entries(record)) {
        if (!isFirst) {
            ageJsonStr = ageJsonStr + ',';
        }
        ageJsonStr = ageJsonStr + `${key}:${JSON.stringify(value)}`;
        isFirst = false;
    }
    ageJsonStr = ageJsonStr + '}';
    return ageJsonStr;
}

export async function createVertex(client, graphPathStr, label, record, flavor) {
    const createQ = `CREATE (n:${label} ${AGEJsonStringify(record)})`;
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
    const createQ = `CREATE (:${edgeStartLabel} {name: ${JSON.stringify(startNodeName)}})-[n:${label} ${AGEJsonStringify(record)}]->(:${edgeEndLabel} {name: ${JSON.stringify(endNodeName)}})`;
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
