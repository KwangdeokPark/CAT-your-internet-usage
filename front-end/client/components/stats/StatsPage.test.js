import React from 'react';
import {Bar, Line, Pie} from 'react-chartjs-2';
import axios from 'axios';
import StatsPage from './StatsPage';
import { mount, shallow } from 'enzyme'

describe('sP', () => {
  it('should do what i like', () => {
    expect (StatsPage).toMatchSnapshot();
  })
})

describe('sP2', () => {
  class LocalStorageMock {
  constructor() {
    this.store = {};
  }

  clear() {
    this.store = {};
  }

  getItem(key) {
    return this.store[key] || null;
  }

  setItem(key, value) {
    this.store[key] = value.toString();
  }

  removeItem(key) {
    delete this.store[key];
  }
};

global.localStorage = new LocalStorageMock;

  it('should render', () => {
    const chatRooms = shallow(<StatsPage />)
    expect(chatRooms).not.toEqual(null)
  })
})

  /*it('should render props properly', () => {
    const props = {
      chatRoomList:  [
        {
          id: 92,
          name: 'Toronto',
          count: 19,
          iconName: 'test'
        },
        {
          id: 95,
          name: 'Vancouver',
          count: 10,
          iconName: 'test'
        }
      ]
    }
    let chatRooms = shallow(<StatsPage {...props}/>)

    expect (chatRooms.prop('label')).toEqual(props.label)
    expect( chatRooms.find(ChatRoomListItem).length).toEqual(2)

    chatRooms.find(ChatRoomListItem).forEach((node, index) => {
      expect(node.find('.name').text()).toEqual(props.chatRoomList[index].name)
    })
  })*/
