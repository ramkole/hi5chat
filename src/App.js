import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import { useEffect, useState } from 'react'
import './App.css'//import Button from './components/Button'
import Channel from './components/Channel'
import NavBar from './components/NavBar'
import Snake from 'react-simple-snake'

firebase.initializeApp({
  apiKey: "AIzaSyDm3-Fb-A6dVy1l3CeNBwsnGJQpHf11QZA",
  authDomain: "hi-5-e9d8f.firebaseapp.com",
  projectId: "hi-5-e9d8f",
  storageBucket: "hi-5-e9d8f.appspot.com",
  messagingSenderId: "722826004097",
  appId: "1:722826004097:web:434ab25e90e1ae5b7eaf80",
  measurementId: "G-PPW5K7CVV2"
})

const auth = firebase.auth();
const db = firebase.firestore()

function App() {
  const [user, setUser] = useState(() => auth.currentUser)
  const [initialize, setInitialize] = useState(true)
 
  useEffect(() => {

    const unsubscribe = auth.onAuthStateChanged( user => 
      {if(user){
        setUser(user)
      }else {
        setUser(null)
      }}
      )
      if(initialize){
        setInitialize(false)
      }
      return unsubscribe
  }, [initialize])
  const signInwithGoogle = async () => {
    const provioder = new firebase.auth.GoogleAuthProvider();
    auth.useDeviceLanguage()

    try {
      await auth.signInWithPopup(provioder);
    } catch (error) {
      console.error(error);
    }
  }
  if(initialize) return <p>Loading....</p>
  const signOut = async () => {
    try { 
      await firebase.auth().signOut()
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className='App' >
      {user ? 
      <>
        <NavBar onClick={signOut} buttonName="SignOut"/>
      
       <Channel user={user} db={db} />
    
        
      </>
      : <>
        <NavBar onClick={signInwithGoogle} buttonName="Login"/>
        <div  style={{height: '450px', width: '80%', margin: '50px'}}>
          <h1>...................Powered by Civi-Intel</h1>
        <Snake />
        </div>
        </>
      }
    </div>
  );
}

export default App;
