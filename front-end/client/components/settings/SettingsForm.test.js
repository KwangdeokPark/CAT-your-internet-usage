import { mount, shallow } from 'enzyme'
import React from 'react';

describe('SettingsForm', () => {

  it('should render', () => {
    const settingsform = shallow(<settingsForm />)
    expect(settingsform).not.toEqual('undefined')
  })



})
