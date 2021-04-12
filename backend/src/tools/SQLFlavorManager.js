// Currently works AGENS / AGE ( in-progress )
import * as path from "path";
import fs from 'fs'
import Flavors from "../config/Flavors";

const sqlBasePath = path.join(__dirname, '../../sql');

// todo: util.format -> ejs
function getQuery(flavor = Flavors.AGENS, name) {
    const defaultSqlPath = path.join(sqlBasePath, `./${name}/default.sql`);
    let sqlPath = path.join(sqlBasePath, `./${name}/${flavor}.sql`);
    if (fs.existsSync(defaultSqlPath)) {
        sqlPath = defaultSqlPath;
    }
    if (!fs.existsSync(sqlPath)) {
        throw new Error(`SQL is not exist, name = ${name}`);
    }
    return fs.readFileSync(sqlPath, 'utf8');
}

export {getQuery}
