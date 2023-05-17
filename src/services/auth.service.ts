import {
    confirmPasswordReset,
    createUserWithEmailAndPassword,
    EmailAuthProvider, 
    getIdToken,
    GoogleAuthProvider,
    reauthenticateWithCredential, 
    sendPasswordResetEmail,
    signInWithEmailAndPassword, 
    signInWithPopup,
    signOut,
    updatePassword,
    updateProfile,
    verifyPasswordResetCode,
  } from "firebase/auth"; 
  import { auth } from "../config/firebase";

  class AuthServices {
    createAccount = ({ email, password, userName }: any) => {
      return createUserWithEmailAndPassword(auth, email, password)
        .then(({ user }) => {
          return updateProfile(user, { displayName: userName })
            .then(() => { 
                return user
            })
            .catch((error) => {
              throw Error(error.code);
            });
        })
        .catch((error) => {
          throw Error(error.code);
        });
    };
  
    signIn = ({ email, password }: any) => {
      return signInWithEmailAndPassword(auth, email, password)
        .then((e) => e)
        .catch((error) => {
          throw Error(error.code);
        });
    };  
    getToken = () => {
      return getIdToken(auth.currentUser)
        .then((e) => e)
        .catch((error) => {
          throw Error(error.code);
        });
    };
  
    sendResetEmail = ({ email }: any) => {
      return sendPasswordResetEmail(auth, email)
        .then((e) => e)
        .catch((error) => {
          throw Error(error.code);
        });
    };
  
    logout = () => {
      return signOut(auth)
        .then((e) => e)
        .catch((error) => {
          throw Error(error.code);
        });
    };
  
    signInWithGoogle = async () => {
      const googleProvider = new GoogleAuthProvider();
      return signInWithPopup(auth, googleProvider)
        .then((e) => e)
        .catch((error) => {
          throw Error(error.code);
        });
    };
    
    resetPassword = async (code, password) => {
      return verifyPasswordResetCode(auth, code)
        .then(function (email) {
          return confirmPasswordReset(auth, code, password)
            .then((e) => e)
            .catch((error) => {
              throw Error(error.code);
            });
        })
        .catch((error) => {
          throw Error(error.code);
        });
    };
  
    updateProfile = async (data: any) => {
      function clean(obj: any) {
        return Object.fromEntries(
          Object.entries(obj)
            .filter(([_, v]) => v != null)
            .map(([k, v]) => [k, v === Object(v) ? clean(v) : v])
        );
      }
      const user = auth.currentUser;
      return updateProfile(
        user,
        clean({
          displayName: data.displayName,
          photoURL: data.photoURL,
        })
      )
        .then((e) => e)
        .catch((error) => {
          throw Error(error.code);
        });
    };
  
    changePassword = async ({ new_password, old_password }) => {
      const user = auth.currentUser;
      const credential = EmailAuthProvider.credential(user.email, old_password);
      return reauthenticateWithCredential(user, credential)
        .then(() => {
          return updatePassword(user, new_password)
            .then((e) => e)
            .catch((error) => {
              throw Error(error.code);
            });
        })
        .catch((error) => {
          throw Error(error.code);
        });
    };
  }

  export const authService = new AuthServices();