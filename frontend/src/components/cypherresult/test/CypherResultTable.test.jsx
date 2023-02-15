import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { uuid } from 'cytoscape/src/util';
import CypherResultTable from '../presentations/CypherResultTable';


window.matchMedia = window.matchMedia || function() {
    return {
        matches: false,
        addListener: function() {},
        removeListener: function() {}
    };
};

describe('CypherResultTable component', () => {
    test('renders command match with (GRAPH|COPY|UPDATE|CREATE|ERROR|null )', () => {
        const data = {
            columns: ['v', 'r', 'v2'],
            command: 'GRAPH',
            message: '',
            rowCount: 0,
            rows: []
        }
        const filterTable = {}
        const refKey = uuid()
        const setIsTable = jest.fn()
    
        const { rerender, getByText, queryByText } = render(
            <CypherResultTable
                data={data}
                refKey={refKey}
                filterTable={filterTable}
                setIsTable={setIsTable}
            />
        )
    
        expect(getByText(/Successfully ran the query!/i)).toBeDefined()
        expect(queryByText(/Edge:/i)).toBeNull()
        expect(queryByText(/Node:/i)).toBeNull()
        expect(queryByText(/Graph:/i)).toBeNull()
        expect(queryByText(/Table:/i)).toBeNull()

        data.command = 'COPY'
        rerender(
            <CypherResultTable
                data={data}
                refKey={refKey}
                filterTable={filterTable}
                setIsTable={setIsTable}
            />
        )

        expect(getByText(/Successfully ran the query!/i)).toBeDefined()
        expect(queryByText(/Edge:/i)).toBeNull()
        expect(queryByText(/Node:/i)).toBeNull()
        expect(queryByText(/Graph:/i)).toBeNull()
        expect(queryByText(/Table:/i)).toBeNull()

        data.command = 'UPDATE'
        rerender(
            <CypherResultTable
                data={data}
                refKey={refKey}
                filterTable={filterTable}
                setIsTable={setIsTable}
            />
        )

        expect(getByText(/Successfully ran the query!/i)).toBeDefined()
        expect(queryByText(/Edge:/i)).toBeNull()
        expect(queryByText(/Node:/i)).toBeNull()
        expect(queryByText(/Graph:/i)).toBeNull()
        expect(queryByText(/Table:/i)).toBeNull()

        data.command = 'CREATE'
        rerender(
            <CypherResultTable
                data={data}
                refKey={refKey}
                filterTable={filterTable}
                setIsTable={setIsTable}
            />
        )

        expect(getByText(/CREATE/i)).toBeDefined()
        expect(queryByText(/Edge:/i)).toBeNull()
        expect(queryByText(/Node:/i)).toBeNull()
        expect(queryByText(/Graph:/i)).toBeNull()
        expect(queryByText(/Table:/i)).toBeNull()

        data.command = 'ERROR'
        data.message = 'Failed to fetch'
        rerender(
            <CypherResultTable
                data={data}
                refKey={refKey}
                filterTable={filterTable}
                setIsTable={setIsTable}
            />
        )

        expect(getByText(/Failed to fetch/i)).toBeDefined()
        expect(queryByText(/Edge:/i)).toBeNull()
        expect(queryByText(/Node:/i)).toBeNull()
        expect(queryByText(/Graph:/i)).toBeNull()
        expect(queryByText(/Table:/i)).toBeNull()

        data.command = null
        rerender(
            <CypherResultTable
                data={data}
                refKey={refKey}
                filterTable={filterTable}
                setIsTable={setIsTable}
            />
        )

        expect(getByText(/Query not entered!/i)).toBeDefined()
        expect(queryByText(/Edge:/i)).toBeNull()
        expect(queryByText(/Node:/i)).toBeNull()
        expect(queryByText(/Graph:/i)).toBeNull()
        expect(queryByText(/Table:/i)).toBeNull()

    })
    test('renders command match with SELECT and empty rows/filterTable', () => {
        const data = {
            columns: ['v', 'r', 'v2'],
            command: 'SELECT',
            message: '',
            rowCount: 0,
            rows: []
        }
        const filterTable = {}
        const refKey = uuid()
        const setIsTable = jest.fn()

        const { getByText } = render(
            <CypherResultTable
                data={data}
                refKey={refKey}
                filterTable={filterTable}
                setIsTable={setIsTable}
            />
        )

        expect(getByText(/Node:/i)).toBeDefined()
        expect(getByText(/Edge:/i)).toBeDefined()
        expect(getByText(/Graph/i)).toBeDefined()
        expect(getByText(/Table/i)).toBeDefined()
        expect(getByText(/No data/i)).toBeDefined()
        expect(screen.getByRole('button', {name: /Graph/i})).toBeEnabled()
        expect(screen.getByRole('button', {name: /Table/i})).toBeEnabled()
    })
    test('renders command match with SELECT and rows', () => {
        const data = {
            columns: ['v', 'r', 'v2'],
            command: 'SELECT',
            message: '',
            rowCount: 1,
            rows: [
            {
                v: {
                    id: uuid(),
                    label: 'TEST',
                    properties: {age: 32},
                },
                r: {
                    end_id: uuid(),
                    id: uuid(),
                    label: 'TEST',
                    properties: {},
                    start_id: uuid(),
                },
                v2: {
                    id: uuid(),
                    label: 'TEST',
                    properties: {name: 'age'},
                }
            },
            {
                v: {
                    id: uuid(),
                    label: 'AGE',
                    properties: {age: 35},
                },
                r: {
                    end_id: uuid(),
                    id: uuid(),
                    label: 'AGE',
                    properties: {},
                    start_id: uuid(),
                },
                v2: {
                    id: uuid(),
                    label: 'AGE',
                    properties: {name: 'age'},
                }
            },
        ]
        }
        const filterTable = []
        const refKey = uuid()
        const setIsTable = jest.fn()

        const { getByText, queryByText } = render(
            <CypherResultTable
                data={data}
                refKey={refKey}
                filterTable={filterTable}
                setIsTable={setIsTable}
            />
        )

        expect(getByText(/Node:/i)).toBeDefined()
        expect(getByText(/Edge:/i)).toBeDefined()
        expect(getByText(/Graph/i)).toBeDefined()
        expect(getByText(/Table/i)).toBeDefined()
        expect(getByText(/"age":32/i)).toBeDefined()
        expect(getByText(/"age":35/i)).toBeDefined()
        expect(getByText(new RegExp(`"id":"${data.rows[0].v.id}"`, 'i'))).toBeDefined()
        expect(getByText(new RegExp(`"id":"${data.rows[0].v2.id}"`, 'i'))).toBeDefined()
        expect(getByText(new RegExp(`"id":"${data.rows[0].r.id}"`, 'i'))).toBeDefined()
        expect(getByText(new RegExp(`"end_id":"${data.rows[0].r.end_id}"`, 'i'))).toBeDefined()
        expect(getByText(new RegExp(`"start_id":"${data.rows[0].r.start_id}"`, 'i'))).toBeDefined()
        expect(getByText(new RegExp(`"id":"${data.rows[1].v.id}"`, 'i'))).toBeDefined()
        expect(getByText(new RegExp(`"id":"${data.rows[1].v2.id}"`, 'i'))).toBeDefined()
        expect(getByText(new RegExp(`"id":"${data.rows[1].r.id}"`, 'i'))).toBeDefined()
        expect(getByText(new RegExp(`"end_id":"${data.rows[1].r.end_id}"`, 'i'))).toBeDefined()
        expect(getByText(new RegExp(`"start_id":"${data.rows[1].r.start_id}"`, 'i'))).toBeDefined()
        expect(queryByText(/No data/i)).toBeNull()
        expect(screen.getByRole('button', {name: /Graph/i})).toBeEnabled()
        expect(screen.getByRole('button', {name: /Table/i})).toBeEnabled()
    })
    test('renders command match with SELECT and filterTable', () => {
        const data = {
            columns: ['v', 'r', 'v2'],
            command: 'SELECT',
            message: '',
            rowCount: 1,
            rows: [
            {
                v: {
                    id: uuid(),
                    label: 'TEST',
                    properties: {age: 32},
                },
                r: {
                    end_id: uuid(),
                    id: uuid(),
                    label: 'TEST',
                    properties: {},
                    start_id: uuid(),
                },
                v2: {
                    id: uuid(),
                    label: 'TEST',
                    properties: {name: 'age'},
                }
            },
            {
                v: {
                    id: uuid(),
                    label: 'AGE',
                    properties: {age: 35},
                },
                r: {
                    end_id: uuid(),
                    id: uuid(),
                    label: 'AGE',
                    properties: {},
                    start_id: uuid(),
                },
                v2: {
                    id: uuid(),
                    label: 'AGE',
                    properties: {name: 'age'},
                }
            },
        ]
        }
        const filterTable = [
            {
                key: uuid(),
                keyword: '32',
                property: {
                    label: 'TEST',
                    property: 'age',
                }
            }
        ]
        const refKey = uuid()
        const setIsTable = jest.fn()

        const { getByText, queryByText } = render(
            <CypherResultTable
                data={data}
                refKey={refKey}
                filterTable={filterTable}
                setIsTable={setIsTable}
            />
        )

        expect(getByText(/Node:/i)).toBeDefined()
        expect(getByText(/Edge:/i)).toBeDefined()
        expect(getByText(/Graph/i)).toBeDefined()
        expect(getByText(/Table/i)).toBeDefined()
        expect(getByText(/"age":32/i)).toBeDefined()
        expect(queryByText(/"age":35/i)).toBeNull()
        expect(queryByText(/"label":"AGE"/i)).toBeNull()
        expect(getByText(new RegExp(`"id":"${data.rows[0].v.id}"`, 'i'))).toBeDefined()
        expect(getByText(new RegExp(`"id":"${data.rows[0].v2.id}"`, 'i'))).toBeDefined()
        expect(getByText(new RegExp(`"id":"${data.rows[0].r.id}"`, 'i'))).toBeDefined()
        expect(getByText(new RegExp(`"end_id":"${data.rows[0].r.end_id}"`, 'i'))).toBeDefined()
        expect(getByText(new RegExp(`"start_id":"${data.rows[0].r.start_id}"`, 'i'))).toBeDefined()
        expect(queryByText(new RegExp(`"id":"${data.rows[1].v.id}"`, 'i'))).toBeNull()
        expect(queryByText(new RegExp(`"id":"${data.rows[1].v2.id}"`, 'i'))).toBeNull()
        expect(queryByText(new RegExp(`"id":"${data.rows[1].r.id}"`, 'i'))).toBeNull()
        expect(queryByText(new RegExp(`"end_id":"${data.rows[1].r.end_id}"`, 'i'))).toBeNull()
        expect(queryByText(new RegExp(`"start_id":"${data.rows[1].r.start_id}"`, 'i'))).toBeNull()
        expect(queryByText(/No data/i)).toBeNull()
        expect(screen.getByRole('button', {name: /Graph/i})).toBeEnabled()
        expect(screen.getByRole('button', {name: /Table/i})).toBeEnabled()
        // screen.getByRole('')
    })
})
