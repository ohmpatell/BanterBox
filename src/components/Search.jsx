import React, { useContext } from 'react'
import { useState } from 'react'
import { db } from '../firebase'
import { collection, doc, query, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import { getDocs, where } from 'firebase/firestore';
import { AuthContext } from '../context/AuthContext';
import { getDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../firebase';



const Search = () => {

  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (err) {
      setErr(true);
    }
  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };

  const handleSelect = async () => {
    //check whether the group(chats in firestore) exists, if not create
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        //create user chats
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {}

    setUser(null);
    setUsername("")
  };

  return (

    <div className="search-container">
      <input 
        type="text"
        className="form-control"
        placeholder="Search..."
        onKeyDown={handleKey}
        
        onChange={(e) => 
          setUsername(e.target.value)
        }
        value={username}
      />

      {err && (
        <p style={{ color: "red", fontSize: "15px" }}>User not found</p>
      )}

      {user && (
        <div className="friend" onClick={handleSelect}>
            <img
                className='search-user-image'
                src={user.photoURL}
            />
            <span className="mr-2">{user.displayName}</span>
      </div>
      )}

    </div>
  )
}

export default Search