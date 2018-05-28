import React from 'react';
import { mount, shallow } from 'enzyme';
import SettingsForm from './SettingsForm';

describe('SettingsForm', () => {
  let component = null;
  const testEmptyUser = {
    username:'',
    alert_start_time:'',
    alert_interval:'',
    errors:{},
    isLoading: false
  };

  const propsEmpty = {
    stateUser: testEmptyUser,
  }

  it('should render', () => {
    component = mount( <SettingsForm {...propsEmpty}/>);
    expect(component).not.toEqual(null);
  });
