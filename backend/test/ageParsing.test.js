import {AGTypeParse}  from "../src/tools/AGEParser";
const assert = require('assert').strict;

describe('Test Connector Api', () => {
    it('Object Circulating', (done) => {
        const ret = AGTypeParse('{"id": 1688849860263937, "label": "car", "properties": {"a": {"b":{"c":{"d":[1, 2, "A"]}}}}}::vertex');
        assert.deepStrictEqual(ret, {
            id: 1688849860263937,
            label: 'car',
            properties: {
                a: {
                    b: {
                        c: {
                            d: [
                                1,
                                2,
                                'A'
                            ]
                        }
                    }
                }
            }
        });
        done();
    });

    it('Null Properties', (done) => {
        const ret = AGTypeParse('{"id": 1688849860263937, "label": "car", "properties": {}}::vertex');
        assert.deepStrictEqual(ret, {"id":1688849860263937,"label":"car","properties":{}});
        done();
    });

    it('Path', (done) => {
        const ret = AGTypeParse('[{"id": 844424930131969, "label": "Part", "properties": {"part_num": "123"}}::vertex, {"id": 1125899906842625, "label": "used_by", "end_id": 844424930131970, "start_id": 844424930131969, "properties": {"quantity": 1}}::edge, {"id": 844424930131970, "label": "Part", "properties": {"part_num": "345"}}::vertex]::path');
        assert.deepStrictEqual(ret, [
            {
                id: 844424930131969,
                label: 'Part',
                properties: { part_num: '123' }
            },
            {
                id: 1125899906842625,
                label: 'used_by',
                end_id: 844424930131970,
                start_id: 844424930131969,
                properties: { quantity: 1 }
            },
            {
                id: 844424930131970,
                label: 'Part',
                properties: { part_num: '345' }
            }
        ]);
        done();
    });
    it('Edge', (done) => {
        const ret = AGTypeParse('{"id": 1125899906842625, "label": "used_by", "end_id": 844424930131970, "start_id": 844424930131969, "properties": {"quantity": 1}}::edge');
        assert.deepStrictEqual(ret, {
            id: 1125899906842625,
            label: 'used_by',
            end_id: 844424930131970,
            start_id: 844424930131969,
            properties: { quantity: 1 }
        });
        done();
    });

});
