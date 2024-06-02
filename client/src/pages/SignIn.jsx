import { useState } from "react"
import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import toast, { Toaster } from "react-hot-toast"

export default function Signin  ()  {
  const navigate = useNavigate()
  
  async function loginHandler(){
  try {
    const response = await axios.post("http://localhost:4040/v1/user/signin",{
      userName,
      password,
     })
     
     localStorage.setItem("token",response.data.token)
     localStorage.setItem("uName",response.data.userName)
     toast.success("Login Success")
      setTimeout(()=>{
        navigate("/dashboard")
      },1000)
    }
    catch (error) {
      toast.error(error.response.data.message)
    console.log("Error While Login-> ",error.response.data.message);
  }
}
    let [userName,setUserName]= useState("");
    let [password,setPassword] = useState("");
    return(
      
       <div className="bg-slate-300 h-screen flex justify-center">
        <Toaster /> 
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Heading label={"Sign in"} />
        <SubHeading label={"Enter your credentials to access your account"} />
        <InputBox onChange={e=>{
          setUserName(e.target.value)
        }} placeholder="xyz@mail.com" label={"Email"} />
        <InputBox onChange={e=>{
          setPassword(e.target.value)
        }} placeholder="123456" label={"Password"} />
        <div className="pt-4">
          <Button onClick={loginHandler} label={"Sign in"} />
        </div>
        <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
      </div>
    </div>
  </div>
    )
}