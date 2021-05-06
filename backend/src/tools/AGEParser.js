import antlr4 from 'antlr4';
import AgtypeLexer from './AgtypeLexer';
import AgtypeParser from './AgtypeParser';
import CustomAgTypeListener from './CustomAgTypeListener';

function AGTypeParse(input) {
    const chars = new antlr4.InputStream(input);
    const lexer = new AgtypeLexer(chars);
    const tokens = new antlr4.CommonTokenStream(lexer);
    const parser = new AgtypeParser(tokens);
    parser.buildParseTrees = true;
    const tree = parser.agType();
    const printer = new CustomAgTypeListener();
    antlr4.tree.ParseTreeWalker.DEFAULT.walk(printer, tree);
    return printer.getResult();
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
