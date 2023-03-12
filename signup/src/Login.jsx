import './css/Login.css';
import Normal from "./assets/normal.png"
import Hidden from "./assets/hidden.png"
import { useState, useRef } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from './config/firebase';
import { addDoc, collection } from "firebase/firestore";
import { storage } from "../src/config/firebase";
import { ref, uploadBytes } from "firebase/storage";
import { v4 } from 'uuid';

var SignupLanding = () => {
  // const invokerRef = useRef();
  // const fileTagRef = useRef();

  const passwordBox = useRef();
  const normalEyeRef = useRef();
  const slashEyeRef = useRef();
  const [imageUpload, setImageUpload] = useState(null);

  // function invokeFileUpload(fileTagRef) {
  //   fileTagRef.current.click();
  // }

  function handleEyecon(event, inputBoxRef, otherEyeRef) {
    event.target.style.display = 'none';
    otherEyeRef.current.style.display = 'block';

    if (event.target.className === 'eyecon normal') {
      inputBoxRef.current.type = 'text';
    } else if (event.target.className === 'eyecon slash') {
      inputBoxRef.current.type = 'password';
    }
  }

  const [userDeets, setUserDeets] = useState({});

  const handleUserDetails = (event) => {
    const { name, value } = event.target;
    setUserDeets((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const registerUser = async () => {
    try {
      const user = await createUserWithEmailAndPassword(auth, userDeets.email, userDeets.pwd);
      console.log(user);
    }
    catch (error) {
      console.log(error.message);
    }
  }

  const digitalIdentifyRef = collection(db, "digital-identify");

  const createDI = async () => {
    await addDoc(digitalIdentifyRef, userDeets);
  }

  const uploadImage = () => {
    if(imageUpload === null)  return;
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then(() => {
      console.log("Document Uploaded!");
    })
  }


  return (
    <div id='main-container'>
      <div className='left-side'>
        <div className='left-inner'>
          <div className='left-sub-div-1'>
            <div className='header'>Sign in to your Account</div>
            <div className='sub-header'>Creating an account is super easy!</div>
          </div>

          <div id='left-sub-div-2'>
            <div id='name-div' className='text-input-cn'>
              <label htmlFor='fullName'>Full Name: </label>
              <input type='text' id='name-input' name='fullName' className='text-input' value={userDeets.fullName} onChange={(e) => handleUserDetails(e)}></input>
            </div>

            <div id='dob-div' className='text-input-cn'>
              <label htmlFor='dob'>Date of Birth: </label>
              <input type="date" id="dob-select" name="dob" value={userDeets.dob} onChange={(e) => handleUserDetails(e)} />
            </div>

            <div id='gender-div' className=''>
              <label htmlFor='gender'>Gender:</label>
              <div>
                <label><input type="radio" id="gender-male" name="gender" value={"Male"} onChange={(e) => handleUserDetails(e)} />Male</label>
                <label><input type="radio" id="gender-female" name="gender" value={"Female"} onChange={(e) => handleUserDetails(e)} />Female</label>
              </div>
            </div>

            <div id='mobno-div' className='text-input-cn'>
              <label htmlFor='mobno'>Mobile No: </label>
              <input type='text' id='mobno-input' name='mobno' className='text-input' onChange={(e) => handleUserDetails(e)}></input>
            </div>

            <div id='pwd-div' className='text-input-cn'>
              <label htmlFor='pwd'>8-digit Security Pin: </label>
              <input type='password' ref={passwordBox} id='pwd-input' name='pwd' className='text-input' onChange={(e) => handleUserDetails(e)}></input>
              <img ref={normalEyeRef} src={Normal} alt="unhide" className='eyecon normal' onClick={(event) => { handleEyecon(event, passwordBox, slashEyeRef) }} />
              <img ref={slashEyeRef} src={Hidden} alt="hide" className='eyecon slash' style={{ display: 'none' }} onClick={(event) => { handleEyecon(event, passwordBox, normalEyeRef) }} />
            </div>

            <div id='email-div' className='text-input-cn'>
              <label htmlFor='email'>Email ID: </label>
              <input type='text' id='email-input' name='email' className='text-input' onChange={(e) => handleUserDetails(e)}></input>
            </div>

            <div id='unique-id-div' className='text-input-cn'>
              <label htmlFor='uid'>Identity Proof ID:</label>
              <input type='text' id='uid-input' name='uid' className='text-input' onChange={(e) => handleUserDetails(e)}></input>
            </div>
          </div>
        </div>
      </div>
      <div className='right-side'>
        <div className='right-inner'>
          {/* <input ref={fileTagRef} type="file" id="input-file-upload" accept='image/png, image/jpg' onInput={(e) => {
            document.getElementById("uploaded-filename").innerText = e.target.files[0].name;
          }} /> */}
          <div className='right-sub-div-1'>
            <label htmlFor='invoker'><i>Upload Identity Proof</i></label>
            {/* <button ref={invokerRef} id="invoker" name="invoker" onClick={() => invokeFileUpload(fileTagRef)}>Upload!</button> */}
            <input type="file" onChange={e => setImageUpload(e.target.files[0])} />
            <p id="uploaded-filename"></p>
          </div>
        </div>
      </div>
      <input type='submit' id='submit' value={"Submit"} onClick={() => { registerUser(); createDI(); setUserDeets({}); uploadImage() }}></input>
    </div>
  )
}

export default SignupLanding;