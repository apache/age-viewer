const getDelete = (ob, name)=>{
    const val = ob[name];
    delete ob[name];
    return val;
};
const toAgeProps = (data, empty=false)=>{
    let props = [];
    Object.entries(data).forEach(([k, v])=>{
        let val = typeof v === 'string' ? `'${v}'` : v;
        props.push(`${k}:${val}`);
    });
    if (!empty && Object.keys(data).length === 0) return '';
    return `{${props.join(', ')}}`;
}

module.exports = {
    getDelete,
    toAgeProps
}
