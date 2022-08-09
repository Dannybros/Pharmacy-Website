import React from 'react'
import { useStateValue } from '../../Reducer/StateProvider';
import SignIn from './Login/SignIn';
import UserPage from './UserSection/UserPage';

function User() {

  const [{user}] = useStateValue();
    
  return (
    <div>
      {Object.keys(user).length === 0?
          <SignIn/>:
          <UserPage/>
      }
    </div>
  )
}

export default User