import React, {useEffect} from 'react'
import { useLocalStorage } from '../../Reducer/useLocalStorage'
import SignIn from './Login/SignIn';
import UserPage from './UserSection/UserPage';

function User() {
    const [user, setUser] =  useLocalStorage("User");

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
            <SignIn setUser={setUser} key={user}/>:
            <UserPage/>
        }
    </div>
  )
}

export default User