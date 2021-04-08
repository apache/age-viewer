function AGTypeParse(input) {
    // todo: need to work with antlr4

    const inputLength = input.length;
    let splitJson;
    if (input.endsWith("::edge")) {
        splitJson = input.substring(0, inputLength - 6)
    } else {
        // ::vertex
        splitJson = input.substring(0, inputLength - 8);
    }
    return JSON.parse(splitJson);
}

async function setAGETypes(client, types) {
    await client.query(`
        CREATE EXTENSION IF NOT EXISTS age;
        LOAD 'age';
        SET search_path = ag_catalog, "$user", public;
    `)

    const oidResults = await client.query(`
        select typelem
        from pg_type
        where typname = '_agtype';`);

    if (oidResults.rows.length < 1)
        throw new Error();

    types.setTypeParser(oidResults.rows[0].typelem, AGTypeParse)
}


export {setAGETypes, AGTypeParse}
