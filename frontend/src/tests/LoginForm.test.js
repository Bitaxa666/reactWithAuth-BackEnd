/**
 * Created by user on 4/30/18.
 */
'use strict';

import React from 'react';
import { configure, shallow, mount, render} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import  LoginForm  from '../components/forms/LoginForm';
import  {expect} from 'chai';
import configureStore from 'redux-mock-store';

configure({ adapter: new Adapter() });

describe('tests for Login Form', function() {

    it("should render 2 input fields", () => {

        // create any initial state needed
        const submit = jest.fn();
        const initialState = {};
        //configureStore
        const mockStore = configureStore();
        const store = mockStore(initialState);

        let wrapper;
        wrapper = shallow(<LoginForm store = {store} submit={submit} />);
        expect(wrapper.find('input')).to.have.length(2);
    });

    it('state email and password equals ""', () => {
        // create a mock function
        const submit = jest.fn();
        let wrapper;
        wrapper = shallow(<LoginForm submit={submit} />);
        expect(wrapper.state().data.email).to.equal('');
        expect(wrapper.state().data.password).to.equal('');
    });

    it("LoginForm element field #email ", () => {
        // create a mock function
        const submit = jest.fn();
        let wrapper;
        wrapper = shallow(<LoginForm submit={submit} />);
        expect(wrapper.find('#email').length).to.equal(1);
    });

    /*it("contains ui form ", () => {
        // create a mock function
        const submit = jest.fn();
        let wrapper;
        wrapper = shallow(<LoginForm submit={submit} />);

        expect(submit.mock.calls.length).to.equal(1);
    });
*/

    it('component contains form ', () => {
        const submit = jest.fn();
        let wrapper;
        wrapper = mount(<LoginForm submit={submit} />);
        expect(wrapper.find('form').length).to.equal(1);
    });

    it('form contains button', () => {
        const submit = jest.fn();
        let wrapper;
        wrapper = mount(<LoginForm submit={submit} />);
        expect(wrapper.find('button').length).to.equal(1);
    });

});