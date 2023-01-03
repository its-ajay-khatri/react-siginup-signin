import { useRef, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import AuthContext from '../../store/auth-context';
import classes from './ProfileForm.module.css';

const ProfileForm = () => {
  const history = useHistory();
  const newpasswordInputRef = useRef();
  const authCtx = useContext(AuthContext)

  const submitHandler = (event) => {
    event .preventDefault();

    const enteredNewPassword = newpasswordInputRef.current.value;

    fetch("https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyD8I8SzF9ByNTnxP9cqocxs8ge1cNIW_BQ",
      {
        method: 'POST',               //byddfault its GET
        body: JSON.stringify({
          idToken: authCtx.token,
          password: enteredNewPassword,
          returnSecureToken: false
        }),
        headers: {
          'Content-type': 'application/json',
        } 
      }
    ).then(res => {
      history.replace('/');
    })
  };

  return (
    <form onSubmit={submitHandler} className={classes.form}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' minLength="7" ref= {newpasswordInputRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
