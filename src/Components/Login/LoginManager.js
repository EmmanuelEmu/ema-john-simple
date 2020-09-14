import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebaseConfig.js';

export const intializeLoginApp = ()=>{
   if (firebase.apps.length ===0) {
    firebase.initializeApp(firebaseConfig);
   }
}

//Event handler for sign in with google 
export const handleSignInWithGoogle = () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(googleProvider)
      .then(result => {
        const { displayName, photoURL, email } = result.user;
        const userInfo = {
          isSignedIn: true,
          name: displayName,
          email: email,
          photo: photoURL,
          success:true
        }
        //Passing the userInfo in the state
        return userInfo;
      })
      .catch(err => {
        console.log(err);
      })
  };

  //Sign In with facebook
  export const handleFbSignInButton = ()=>{
    const fbProvider = new firebase.auth.FacebookAuthProvider();
    return firebase.auth().signInWithPopup(fbProvider)
    .then(res => {
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      var token = res.credential.accessToken;
      // The signed-in user info.
      var user = res.user;
      user.success = true;
      return user;
    })
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
  } 


    //handler of signing out
    export const handleSignOut = () => {
       return firebase.auth().signOut()
          .then(res => {
            const signOutUser = {
              isSignedIn: false,
              name: '',
              email: '',
              photo: '',
              success:false
            };
            return signOutUser;
          })
          .catch(err => {
            console.log(err);
          });
      }

      //creating user with email and password
      export const createUserWithEmailAndPassword = (name,email,password)=>{
        return firebase.auth().createUserWithEmailAndPassword(email,password)
        .then(res => {
          const successMsg = res.user;
          successMsg.success = true;
          updateUserInfo(name);
          return successMsg;
        })
        .catch(function (error) {
          // Handle Errors here.
          var errorMessage = error.message;
          const errMsg = {};
          errMsg.error = errorMessage;
          errMsg.success = false;
          return errMsg;
        });
      }

      //sign in with email and password   
      export const signInWithEmailAndPassword = (email,password)=>{
        return firebase.auth().signInWithEmailAndPassword(email,password)
        .then(res => {
          const successMsg = res.user;
          successMsg.error = '';
          successMsg.success = true;
          return successMsg;
        })
        .catch(function (error) {
          // Handle Errors here
          var errorMessage = error.message;
          // ...
          const errMsg = {};
          errMsg.error = errorMessage;
          errMsg.success = false;
          return errMsg;
        });
      }

      //Updating user info
      const updateUserInfo = name => {
        var user = firebase.auth().currentUser;
    
        user.updateProfile({
          displayName:name
        }).then(function () {
          console.log('User name updated successfully');
        }).catch(function (error) {
          console.log(error);
        });
      }

