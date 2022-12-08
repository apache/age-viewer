const getDelete = (ob, name)=>{
    const val = ob[name];
    delete ob[name];
    return val;
};

module.exports = {
    getDelete
}
