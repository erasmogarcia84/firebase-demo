import firebase from "firebase";

export async function login() {
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope("https://www.googleapis.com/auth/contacts.readonly");

  const data = await firebase.auth().signInWithPopup(provider);

  return data?.additionalUserInfo?.profile;
}

export function logout() {
  firebase.auth().signOut();
}
