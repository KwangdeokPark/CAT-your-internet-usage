import axios from 'axios';
import setAuthorizationToken from './setAuthorizationToken';

describe('sAT', () => {
  it('should do what i like', () =>{
    expect(setAuthorizationToken('orange')).toMatchSnapshot();
  });
})
