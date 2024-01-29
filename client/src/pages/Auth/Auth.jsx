import React,{useState}from 'react'
import './Auth.css'
import {useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {signup,login} from '../../actions/auth'


const Auth = () => {

   
  const dispatch=useDispatch();
  const navigate=useNavigate();

   const handleSwitch=()=>{
      setIsSignUp(!IsSignUp)
   }

  const[IsSignUp,setIsSignUp]=useState(false)
  const[name,setName]=useState('');
  const[email,setEmail]=useState('');
  const[password,setPassword]=useState('');

  const handleSubmit=(e)=>{
     e.preventDefault();
     console.log({name,email,password})
     if(!email && !password){
      alert("enter name and password");
     }
     if(IsSignUp){
      if(!name){
         alert("enter name to continue");
      }
     dispatch(signup({name,email,password},navigate))
     }
     else{
      dispatch(login({email,password},navigate))
     }
  }

  return (
     <section className='auth-section'>
        <div className='auth-container-2'>
         <form onSubmit={handleSubmit}>
             {IsSignUp && (
             <label htmlFor="name">
               <h4>Name</h4>
               <input type="text" id="name" onChange={(e)=>{setName(e.target.value)}}/>
             </label>)
            } 
             <label htmlFor="email">
               <h4>Email</h4>
               <input type="email" id="email" onChange={(e)=>{setEmail(e.target.value)}}/>
             </label>
             <label htmlFor="password">
               <h4>Password</h4>
               <input type="password" id="password" onChange={(e)=>{setPassword(e.target.value)}}/>
              </label>
              <button type="submit" className='auth-btn'>{IsSignUp?"Signup":"Login"}</button>
         </form>
         <p>
            {IsSignUp?"Already have an account":"Don't have an account"}
            <button type="submit" className='handle-switch-btn' onClick={handleSwitch}>{IsSignUp?"Login":"Signup"}</button>
         </p>
        </div>
     </section>
  )
}

export default Auth