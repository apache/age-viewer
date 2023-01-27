const fs = require('fs').promises;
const papa = require('papaparse');
const path = require('path');


const readCSV = (file, resolve, reject)=>{
    return papa.parse(file, {
        skipEmptyLines:true,
        transform:(val, col)=>{
            if (col !== 0) return val;

        },
        complete:(results)=>{
            resolve(results);
        },
        error:(err)=>{
            reject(err);
        },
    });
}
const getQueryList = async (req, res, next)=>{
    const p = path.join(__dirname, "../../misc/graph_kw.csv");
    const file = await fs.readFile(p, {
        encoding: 'utf-8'
    });

    const results = await new Promise((resolve, reject)=>{
        readCSV(file, resolve, reject);
    });

    const kwResults = {
        kw:results.data[0].splice(1),
        relationships:results.data.slice(1)
    }
    res.status(200).json(kwResults).end();

}
module.exports = getQueryList;