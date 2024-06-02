import { useState } from "react"
import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import axios from "axios"
import { useNavigate } from "react-router-dom"
export default function Signup() 
 {
  const navigate = useNavigate()
   let [firstName,setFirstName] = useState("");
   let [lastName,setLastName] = useState("");
   let [userName,setUserName]= useState("");
   let [password,setPassword] = useState("")
   async function submitHandler(){
        const response = await axios.post("http://localhost:4040/v1/user/signup",{
          firstName,lastName,userName,password
        })
        alert("Sign up success")
        localStorage.setItem("token",response.data.token)
        localStorage.setItem("uName",response.data.userName)
        navigate("/dashboard")
   }
    return <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Heading label={"Sign Up"} />
        <SubHeading label={"Enter your information to create an account"} />
        <InputBox onChange={e=>{
          return setFirstName(e.target.value)
        }} placeholder="John" label={"First Name"} />
        <InputBox onChange={e=>{
          return setLastName(e.target.value)
        }} placeholder="Doe" label={"Last Name"} />
        <InputBox onChange={e=>{
          return setUserName(e.target.value)
        }} placeholder="xyz@gmail.com" label={"Email"} />
        <InputBox onChange={e=>{
          return setPassword(e.target.value)
        }} placeholder="123456" label={"Password"} />
        <div className="pt-4">
          <Button onClick={submitHandler} label={"Sign up"} />
        </div>
        <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
      </div>
    </div>
  </div>
}