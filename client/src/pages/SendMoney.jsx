import axios from "axios";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';

export default function SendMoney() {
    const navigate = useNavigate()
    const [amount, setAmount] = useState("");
    const [searchParams] = useSearchParams();
    const userName = searchParams.get("name");
    const token = localStorage.getItem("token");
    const userId = searchParams.get("id");

    async function amountTransferHandler() {
        try {
            const response = await axios.post("http://localhost:4040/v1/account/transfer", {
                to: userId,
                amount
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(response.data);
            toast.success("Payment successful!");
        } catch (error) {
            console.log("Send Money Error-> ", error);
            toast.error(`Payment failed! ${error.response?.data?.message || error.message}`);
        }
    }

    return (
        <div className="flex justify-center h-screen bg-gray-100">
            <Toaster /> 
            <div className="h-full flex flex-col justify-center">
                <div className="border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg">
                    <div className="flex flex-col space-y-1.5 p-6">
                        <h2 className="text-3xl font-bold text-center">Send Money</h2>
                    </div>
                    <div className="p-6">
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                                <span className="text-2xl text-white">{userName[0]}</span>
                            </div>
                            <h3 className="text-2xl font-semibold">{userName.toUpperCase()}</h3>
                        </div>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    htmlFor="amount"
                                >
                                    Amount (in Rs)
                                </label>
                                <input
                                    type="number"
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                    id="amount"
                                    placeholder="Enter amount"
                                    onChange={(e) => {
                                        setAmount(e.target.value);
                                    }}
                                />
                            </div>
                            <button
                                onClick={amountTransferHandler}
                                className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white"
                            >
                                Initiate Transfer
                            </button>
                            <button
                                onClick={()=>{
                                    navigate(-1)
                                }}
                                className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-yellow-300 text-zinc-800 "
                            >
                                Go Back
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
