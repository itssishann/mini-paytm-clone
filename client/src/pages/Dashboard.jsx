import axios from "axios"
import Appbar  from "../components/AppBar"
import  Balance  from "../components/Balance"
import  Users  from "../components/Users"
import { useEffect,useState } from "react"

export default function Dashboard ()  {
    const token = localStorage.getItem("token");
    const [balance, setBalance] = useState("");

    useEffect(() => {
        async function fetchBalance() {
            try {
                const response = await axios.get("http://localhost:4040/v1/account/balance", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setBalance(response.data.balance);
            } catch (error) {
                console.error("Error fetching balance: ", error);
            }
        }

        fetchBalance();
    }, []);
    return <div>
        <Appbar />
        <div className="m-8">
            <Balance value={balance} />
            <div className="flex">
        <div className="font-bold text-lg">
            Account Holder Name
        </div>
        <div className="font-semibold ml-4 text-lg">
            {localStorage.getItem("uName")}
        </div>
    </div>
            <Users />
        </div>
    </div>
}