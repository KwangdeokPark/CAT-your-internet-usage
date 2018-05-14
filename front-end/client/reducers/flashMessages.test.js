import reducer from './flashMessages'
import * as types from '../actions/types'

describe('flashMessages reducer', () =>{
  it('should handle ADD_FLASH_MESSAGE',() =>{
    expect(
      reducer([],{
        type: types.ADD_FLASH_MESSAGE,
        text: 'test',
        type: ''
      })
    ).toEqual({
        type: '',
        text: 'test',
        id:0
    })
  })
})
