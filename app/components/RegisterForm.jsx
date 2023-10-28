'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterForm() {

    //creating usestate for my set values
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!email || !password){
            setError("All fields are necessary.");
            return;
        }

        try {
            //for the error in case of same email for new registry.
            const resUserExists = await fetch("api/userExists", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            })

            // now we will get reUserExists from above for user
            const { user } = await resUserExists.json();

            if (user) {
                setError("User already exists");
                return;
            }

            const res = await fetch('api/register', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            //If the form is registered, reset the form
            if(res.ok) {
                const form = e.target;
                form.reset();
                //after registering, go to home page
                router.push("/");
            } else {
                console.log("User registration failed.");
            }
        }
        //it will catch the error as we defined in route.js
        catch (error) {
            console.log("Error during registration:", error);
        }
    };

    return (
    <div>
        <div className="place-items-center text-center mb-3">
            <div className="bg-black text-white py-2">
                <h1 className="text-xl font-bold">Registration</h1>
            </div>
        </div>

        <div className="grid place-items-center">
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input 
                    onChange={(e) => setEmail(e.target.value)} 
                    type="text" 
                    placeholder="Email"></input>
                <input 
                    onChange={(e) => setPassword(e.target.value)}
                    type="password" 
                    placeholder="Password"/>
                <button className="bg-black text-white font-bold cursor-pointer px-6 py-2 my-1">Submit</button>
                
                { error && (
                    <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">{error}</div>
                )
                }
            </form>
            </div>
    </div>
    );
}