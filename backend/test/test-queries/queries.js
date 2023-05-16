export const queries = {
    drop_graph:(graph, cascade=false, cb=null)=>{
        const q = `SELECT * FROM drop_graph('${graph}', ${cascade})`
        if (cb){
            return cb(q)
        }
        return q
    }
}