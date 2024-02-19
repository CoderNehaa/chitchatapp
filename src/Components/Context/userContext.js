import { createContext, useContext, useState, useEffect } from "react";

import db, { auth } from "../../firebase";
import { collection, getDocs, addDoc, query, where, setDoc, doc, onSnapshot, orderBy } from 'firebase/firestore';
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";

const userContext = createContext();

// Custom Provider

function UserProvider({children}){
    const arr = ["Baby", "Smokey", "Oreo", "Daisy", "Mimi", "Zoe", "Bubba", "Leo", "Bandit", "Rocky", "Simba", "Callie", "Mittens", "Abby", "Cali", "Pepper", "Boo", "Mia", "Patches", "Bella"];
    const [user, setUser] = useState(null);
    const [members, setMembers] = useState([]);
    const [messages, setMessages] = useState([]);
    
    async function checkUserExists(email) {
        const q = query(collection(db, "members"), where("email", "==", email));
        const querySnapshot = await getDocs(q);
        return !querySnapshot.empty;
    }

    const signInWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
        .then(res => {
            const currentUser={
                name:res.user.displayName,
                email:res.user.email
            }
            setUser(currentUser);
            // Check if user already exists before adding
            checkUserExists(currentUser.email)
            .then(exists => {
                if (!exists) {
                    addMemberToDb(currentUser.name, currentUser.email);
                } else {
                    console.log("User already exists");
                    // Handle case where user already exists
                }
            })
        })
        .catch(err => {
            console.log(err.message);
        })
    }

    function logOut(){
        signOut(auth)
        .then(() => {
            setUser(null);
            console.log('signed out successfully');
        })
        .catch(err => {
            console.log(err.message);
        })
    }

    const authentication = () => {
        onAuthStateChanged(auth, (currentUser) => {
            if(currentUser){
                const user = {
                    name:currentUser.displayName,
                    email:currentUser.email
                }
                setUser(user);
            }
        })
    }

    async function addMemberToDb(name, email){
        const docRef = await addDoc(collection(db, "members"), {
            name: name,
            email:email
        });
        
        const id = docRef.id;

        await setDoc(doc(db, "members", id), {
            id: id,
            name: name,
            email: email
        });   
        getMembers();
    }

    const getMembers = async () => {
        const snapshot = await getDocs(collection(db, 'members'));
        const userData = [];
        snapshot.forEach((doc) => {
            userData.push({ 
                id: doc.id, 
                name: doc.data().name, 
                email:doc.data().email
            });
        });
        setMembers(userData);
    };

    const getMessages = async () => {
        const snapshot = await getDocs(collection(db, 'messages'));
        const msgData = [];
        snapshot.forEach((doc) => {
            msgData.push({ 
                id: doc.id, 
                name: doc.data().name, 
                email:doc.data().email,
                msg:doc.data().msg,
                time:doc.data().time
            });
        });
        setMessages(msgData);
    }

    async function addMessageToDb(text){
        const docRef = await addDoc(collection(db, "messages"), {
            name: user.name,
            email:user.email,
            msg:text,
            time:new Date().toLocaleTimeString()
        });
            
        const id = docRef.id;

        await setDoc(doc(db, "messages", id), {
            id: id,
            name: user.name,
            email: user.email,
            msg: text,
            time: new Date().toLocaleTimeString()
        });   
        getMessages();
    }

    useEffect(() => {
        const q = query(collection(db, 'messages'), orderBy('time')); 
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          const msgData = [];
          querySnapshot.forEach((doc) => {
            msgData.push({
              id: doc.id,
              name: doc.data().name,
              email: doc.data().email,
              msg: doc.data().msg,
              time: doc.data().time
            });
          });
          setMessages(msgData);
          
        });
    
        return () => {
          unsubscribe();
        };
      }, []);
    
    return(
        <userContext.Provider value={{
            user, members, messages, signInWithGoogle, getMembers, logOut, authentication, getMessages, messages, addMessageToDb
        }}>
            {children}
        </userContext.Provider>
    )
}

function UserHook(){
    return useContext(userContext);
}

export default UserProvider;
export {userContext, UserHook};
