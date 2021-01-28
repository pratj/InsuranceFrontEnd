import React from 'react';
import {render,cleanup} from '@testing-library/react'
import {App} from '../App'

beforeEach(cleanup);

describe('<App/>',()=>{
    it('renders the application',()=>{
        const { queryByTestId, debug }= render(<App/>);
        debug();
    })
})