const assert = require('assert');
const {toAgeProps} = require('../src/util/ObjectExtras');

describe('object serialize', ()=>{
    it('serialize basic', ()=>{
        let serial = toAgeProps({'id':2,'name':'hi'});
        assert.equal(serial, "{id:2, name:'hi'}");
    });
});
