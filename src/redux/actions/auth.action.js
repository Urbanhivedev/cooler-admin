import { db, fb, auth, storage } from '../../config/firebase';
import {  loginFailed, loginSuccess} from '../reducers/loggedIn.slice';
import { clearUser,  signupFailed, storeUserData } from '../reducers/auth.slice';
import { v4 as uuidv4 } from 'uuid';
import { notifyErrorFxn, notifySuccessFxn } from 'src/utils/toast-fxn';

  export const signin = (user, navigate,setLoading) => async (dispatch) => {
    fb.auth().signInWithEmailAndPassword(user.email, user.password)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      console.log('Signed In user is: ', user.email);
      dispatch(fetchUserData(user.uid, "sigin", navigate, setLoading));
      dispatch(loginSuccess({ user }));
      //navigate('/dashboard/home');
    })
    .catch((error) => {
      setLoading(false);
    
      const errorCode = error.code;
      const errorMessage = error.message;
      notifyErrorFxn(errorMessage);
      console.log('Error Code is: ', errorCode, + ' Msg is: ', errorMessage);
      dispatch(loginFailed(errorMessage));
    });

};


export const signup = (user, file, history, setLoading, url) => async (dispatch) => {
  console.log(user);
    fb.auth().createUserWithEmailAndPassword(
      user.email,
      user.password
  ).then((res)=>{
    return db.collection('Candidates').doc(res.user.uid).set({
      uid: res.user.uid,
      name: user.name,
      email: user.email,
      phone: user.phone,
      password: user.password,
      logo: url,
    })
  }).then(() => {
    alert('Registered Successfully✔😊')
    history.push("/");
  }).catch((err) => {
    console.error("Error signing up: ", err);
    var errorMessage = err.message;
   // dispatch(signupFailed({ errorMessage }));
    setLoading(false);
  })
}


export const fetchUserData = (id, type, navigate, setLoading) => async (dispatch) => {
  var user = db.collection("employers").doc(id);
  user.get().then((doc) => {
  if (doc.exists) {
    // console.log("User Data:", doc.data());
    dispatch(storeUserData(doc.data()));
    if(type === "sigin"){
      notifySuccessFxn("Logged In😊");
      navigate('/dashboard/home', { replace: true });
    }
  } else {
      setLoading(false);
      notifyErrorFxn("Unauthorized❌")
      console.log("No such document!");
  }
}).catch((error) => {
  console.log("Error getting document:", error);
});
return user;
};


export const uploadImage = (user, file, history, setLoading) => async (dispatch) => {
  const imageName = uuidv4() + '.' + file?.name?.split('.')?.pop();
  console.log('File Name: ', imageName);
  const uploadTask = storage.ref(`logo_images/${imageName}`).put(file);
  uploadTask.on(
    "state_changed",
    snapshot => {
      const progress = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );
      // setProgress(progress);
    },
    error => {
      console.log(error);
    },
    () => {
      storage
        .ref("logo_images")
        .child(imageName)
        .getDownloadURL()
        .then(url => {
          console.log('Image URL: ', url);
          dispatch(signup(user, file, history, setLoading, url));
        });
    }
  );
}

export const logout = (navigate) => async (dispatch) => {
  fb.auth().signOut().then(() => {
    console.log('logout successful!');
    dispatch(clearUser());
   navigate('/login');
  }).catch((error) => {
    // An error happened.
    console.log('logout failed response: ', error.message);
  });
  
}