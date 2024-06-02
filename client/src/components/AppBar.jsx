import {  useNavigate } from "react-router-dom"

export default function Appbar ()  {
    const navigate = useNavigate()
    return <div className="shadow h-14 flex justify-between">
        <div className="flex flex-col justify-center h-full ml-4">
            PayTM App
        </div>
        <div className="flex">
            <div className="flex flex-col justify-center h-full mr-4">
                {localStorage.getItem("uName")}
            </div>
            <button className=" text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg mt-2 text-sm px-3 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800 "  onClick={()=>{
                localStorage.removeItem("token")
                localStorage.removeItem("uName")
                navigate("/signin")
            }}> Logout </button>
           
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    {localStorage.getItem("uName")[0]}
                </div>
            </div>
        </div>
    </div>
}