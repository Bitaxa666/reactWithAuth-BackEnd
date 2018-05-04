/**
 * Created by user on 5/3/18.
 */
import React from 'react';
import { configure, shallow, mount, render} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import  TopNavigation  from '../components/navigation/TopNavigation';
import  {expect} from 'chai';
import configureStore from 'redux-mock-store';

configure({ adapter: new Adapter() });

describe.only('tests for Login Form', function() {

    it("should render 2 input fields", () => {

        // create any initial state needed
        const submit = jest.fn();
        const initialState = {};
        //configureStore
        const mockStore = configureStore();
        const store = mockStore(initialState);

        let wrapper;
        wrapper = shallow(<TopNavigation store = {store} user={{email: "24324"}} hasBooks={true} logout={submit} />);
        expect(wrapper.find('menu')).to.have.length(2);
    });


});