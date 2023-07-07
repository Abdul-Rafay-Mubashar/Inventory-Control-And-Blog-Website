import React from 'react'
import { useState,useEffect } from 'react'
import { useHistory } from 'react-router-dom';
// import Dashboard from './Dashboard';


export default function Login() {
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const history = useHistory()

    useEffect(() => {
        console.log("Ok")
        var result = localStorage.getItem('User');
        var resultAsJson = JSON.parse(result);
        if (resultAsJson !== null) {
            history.push('/Dashboard');

          
        }
      }, []);
    const For_Password=(event)=>{
      setPassword(event.target.value)
      console.log(password)
    }
    const For_Email=(event)=>{
      setEmail(event.target.value)
      console.log(email)
    }
    const login_button=async()=>{
        // setEmail(document.getElementsByClassName('Get')[0].value)
        // setPassword(document.getElementsByClassName('Get')[1].value)
        console.log(email,password)
        const User={email,password}
        
        const Response=await fetch("http://localhost:5000/api/User/Login",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(User)
        })
        const data=await Response.json()
        console.log(data,User)
        if(data.error===undefined)
        {
            document.getElementsByClassName('Invalid_Heading')[1].style.display='flex'
            document.getElementsByClassName('Invalid_Heading')[0].style.display='none'
            localStorage.setItem("User",JSON.stringify( data))
            history.push('/Dashboard')
            // window.location.href=("http://localhost:3000//Dashboard")
        }
        else{
            document.getElementsByClassName('Invalid_Heading')[0].style.display='flex'
            document.getElementsByClassName('Invalid_Heading')[1].style.display='none'
        }
    }
  return (
    <>
    <div className='Full_Page'>
        <div className='Heading'>
          <div className="Img_Div">
            <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRMAu236nSTdB6gGu-7Zxdxi2h1y5Lavrpc6e3wGybd8izItpws6wOMA2GzZUgcF71elU&usqp=CAU' alt='Pic' className='Img_Pic'></img>
          </div>
        </div>
        <div className='Heading_Line'>
          <div className="Content">
            Make The Most You Love To Wear
          </div>
        </div>
        <div className='Login_Com'>
          <div className='Login_Form'>
            <div className='Login_Inside'>
              <div className='Invalid_Heading'>
                  Invalid Email Or Password
              </div>
              <div className='Invalid_Heading'>
                  Succesfully Login
              </div>
              <div className='Heading_And_Input'>
                <div className='head'>
                  Email
                </div>
                <div className='Input'>
                  <input className='Get' type='text' value={email} onChange={For_Email}></input>
                </div>
              </div>
              <div className='Heading_And_Input'>
                <div className='head'>
                  Password
                </div>
                <div className='Input'>
                  <input className='Get_Password' type='text' value={password} onChange={For_Password}></input>
                </div>
              </div>
              <div className='Policy_Box'>
                By Clicking Join Now You Agree`s to LinkedIn`s User Agreement Privacy Policy And Cookies Policy
              </div>
              <div className='Sign_Up_Button' onClick={login_button}> 
                Log in
               </div>
              <div className='Bordar_Line'>
                <div className='Line'>

                </div>
                <div className='Or'>
                  OR
                </div>
                <div className='Line'>

                </div>
              </div>
              <div className='Option'>
                <div className='Option_Inside'>
                  <div className='Option_Text'>
                    Already On LinkedIn?
                  </div>
                  <a href='' className='Option_SignIn'>
                    SignUp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
