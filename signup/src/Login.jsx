import './css/Login.css';
import Normal from "./assets/normal.png"
import Hidden from "./assets/hidden.png"
import { useEffect, useState, useRef } from 'react';


var SignupLanding = () => {
  const invokerRef = useRef();
  const fileTagRef = useRef();

  const passwordBox = useRef();
  const normalEyeRef = useRef();
  const slashEyeRef = useRef();
  
  function invokeFileUpload(fileTagRef) {
    fileTagRef.current.click();        
  }

  function handleEyecon(event, inputBoxRef, otherEyeRef) {
  event.target.style.display = 'none';
  otherEyeRef.current.style.display = 'block';
  
    if(event.target.className === 'eyecon normal') {
      inputBoxRef.current.type = 'text';
    } else if(event.target.className === 'eyecon slash') {
      inputBoxRef.current.type = 'password';
    }
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
              <label htmlFor='name-input'>Full Name: </label>
              <input type='text' id='name-input' name='name-input' className='text-input'></input>
            </div>

            <div id='dob-div' className='text-input-cn'>
              <label htmlFor='dob-select'>Date of Birth: </label>
              <input type="date" id="dob-select" name="dob-select" value="2018-07-22" />
            </div>
            
            <div id='gender-div' className=''>
              <label htmlFor='gender'>Gender:</label>
              <div>
                <label><input type="radio" id="gender-male" name="gender" value={"Male"}/>Male</label>
                <label><input type="radio" id="gender-female" name="gender"  value={"Female"}/>Female</label>
              </div>
            </div>

            <div id='mobno-div' className='text-input-cn'>
              <label htmlFor='mobno-input'>Mobile No: </label>
              <input type='text' id='mobno-input' name='mobno-input' className='text-input'></input>
            </div>
            
            <div id='pwd-div' className='text-input-cn'>
              <label htmlFor='pwd-input'>8-digit Security Pin: </label>
              <input type='password' ref={passwordBox} id='pwd-input' name='pwd-input' className='text-input'></input>
              <img ref={normalEyeRef} src={Normal} alt="unhide" className='eyecon normal' onClick={(event) => {handleEyecon(event, passwordBox, slashEyeRef)}}/>
              <img ref={slashEyeRef} src={Hidden} alt="hide" className='eyecon slash' style={{display: 'none'}} onClick={(event) => {handleEyecon(event, passwordBox, normalEyeRef)}}/>
            </div>
            
            <div id='email-div' className='text-input-cn'>
              <label htmlFor='email-input'>Email ID: </label>
              <input type='text' id='email-input' name='email-input' className='text-input'></input>
            </div>
            
            <div id='unique-id-div' className='text-input-cn'>
              <label htmlFor='uid-input'>Identity Proof ID:</label>
              <input type='text' id='uid-input' name='uid-input' className='text-input'></input>
            </div>
          </div>
        </div>
      </div>
      <div className='right-side'>
        <div className='right-inner'>
          <input ref={fileTagRef} type="file" id="input-file-upload" accept='image/png, image/jpg' onInput={(e) => {
            document.getElementById("uploaded-filename").innerText = e.target.files[0].name;
          }}/>
          <div className='right-sub-div-1'>
            <label htmlFor='invoker'><i>Upload Identity Proof</i></label>
            <button ref={invokerRef} id="invoker" name="invoker" onClick={() => invokeFileUpload(fileTagRef)}>Upload!</button>
            <p id="uploaded-filename"></p>
          </div>
        </div>
      </div>
      <input type='submit' id='submit' value={"Submit"}></input>
    </div>
  )
}

export default SignupLanding;