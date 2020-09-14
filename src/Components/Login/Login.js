import React, { useState } from 'react';
import { useContext } from 'react';
import { UserContext } from '../../App.js';
import { useHistory, useLocation } from 'react-router-dom';
import { createUserWithEmailAndPassword, handleFbSignInButton, handleSignInWithGoogle, handleSignOut, intializeLoginApp, signInWithEmailAndPassword } from './LoginManager.js';

function Login() {

  //importing the firebase core 
  intializeLoginApp();
  //For facebook login


    //for the Context API
    const [loggedInUser,setLoggedInUser] = useContext(UserContext);
    
    //Hooks for redirecting the page after login
    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

  //state for toggling whether a user is new in website 
  const [newUser, setNewUser] = useState(false);
  //State for storing all data of user
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    password: '',
    photo: '',
    error: '',
    success: false
  });


  //Google sign in and create account properties
  const googleSignInProperties = ()=>{
    handleSignInWithGoogle()
    .then(res => {
      setUser(res);
      setLoggedInUser(res);
      history.replace(from);
    })
  };

  //Properties of signout button
  const signOut = ()=>{
    handleSignOut()
    .then(res=>{
      setUser(res);
      setLoggedInUser(res);
    })
  };
  
  //facebook sign in properties
  const fbSignInProperties = ()=>{
    handleFbSignInButton()
    .then(res=>{
      setUser(res);
      setLoggedInUser(res);
      history.replace(from);
    })
  }


  //form
  const handleChange = (event) => {
    let isFormValid = true;
    if (event.target.name === 'email') {
      isFormValid = /\S+@\S+\.\S+/.test(event.target.value);
      // console.log(isValidEmail);
    }
    else if (event.target.name === 'password') {
      const isPasswordValid = event.target.value.length > 6;
      const isNumberExist = /\d{1}/.test(event.target.value);
      isFormValid = isPasswordValid && isNumberExist;
    }
    //form validity
    if (isFormValid) {
      const newUser = { ...user };
      newUser[event.target.name] = event.target.value;
      setUser(newUser);
    }
  }
  const handleSubmit = (e) => {
    if (newUser && user.email && user.password) {
     createUserWithEmailAndPassword(user.name,user.email,user.password)
     .then(res=>{
      setUser(res);
      setLoggedInUser(res);
      history.replace(from);
     })
    }
    // if (!newUser && user.email && user.password){
      else{
      signInWithEmailAndPassword(user.email,user.password)
      .then(res=>{
        setUser(res);
        setLoggedInUser(res);
        history.replace(from);
      })
    }
    e.preventDefault();
  };


  return (
    <div style = {{textAlign:'center'}}>
      {
        user.isSignedIn ? <button onClick={signOut}>Sign out</button> : <button onClick={googleSignInProperties}>Sign in</button>
      }
      <br/>
      <button onClick = {fbSignInProperties}>Sign in with facebook</button>
      {
        user.isSignedIn && <div>
          <p>Welcome {user.name}</p>
          <p>email:{user.email}</p>
          <p><img src={user.photo} alt="" /></p>
        </div>
      }

      <h1>Our Own authentication</h1>
      <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id="" />
      <label htmlFor="newUser">Registration</label>
      <form onSubmit={handleSubmit}>
        {newUser && <input type="text" name="name" placeholder='your name' id="" required onBlur={handleChange} />}
        <br />
        <input type="text" name="email" id="" placeholder='Your email address' required onBlur={handleChange} /><br />
        <input type="password" name="password" id="" placeholder='password' required onBlur={handleChange} /><br />
        <input type="submit" value={newUser ? 'Sign up' : 'Sign in'}/>
      </form>
      {
        user.success ? <p>user {newUser ? 'created' : 'logged In'} succesfully</p> : <p>{user.error}</p>
      }
    </div>
  );
}

export default Login;
