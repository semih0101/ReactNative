import auth from '@react-native-firebase/auth';

export const signOutUser = () => {
   return auth().signOut()
}
export const signInWithEmailAndPassword = ({email,password}) => {
    return auth().signInWithEmailAndPassword(email,password);
}