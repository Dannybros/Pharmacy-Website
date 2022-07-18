import React, {useEffect} from 'react'
import { useStateValue } from '../../Reducer/StateProvider';
import SignIn from './Login/SignIn';
import UserPage from './UserSection/UserPage';

function User() {

    const [{user}] = useStateValue();

    useEffect(() => {
      if (Object.keys(user).length === 0) {
        document.title = 'Log In User';
      } else {
        document.title = `User Info`;
      }
    }, [user])
    
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