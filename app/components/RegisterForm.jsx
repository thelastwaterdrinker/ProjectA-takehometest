'use client'

import React, { useState } from "react";
import { FcCheckmark } from "react-icons/fc";
import { MdOutlineClose } from "react-icons/md";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordLengthValid, setPasswordLengthValid] = useState(false);
  const [lowercaseValid, setLowercaseValid] = useState(false);
  const [uppercaseValid, setUppercaseValid] = useState(false);
  const [decimalValid, setDecimalValid] = useState(false);
  const [specialCharacterValid, setSpecialCharacterValid] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!email){
        setError("Email is required.");
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
        if (res.ok) {
          const form = e.target;
          form.reset();
          setEmail("");
          setPassword("");
          // Reset other state variables here if needed
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


  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    // Check password criteria separately
    setPasswordLengthValid(newPassword.length >= 8);
    setLowercaseValid(/[a-z]/.test(newPassword));
    setUppercaseValid(/[A-Z]/.test(newPassword));
    setDecimalValid(/\d/.test(newPassword));
    setSpecialCharacterValid(/[!@#$%^&*(),.?":{}|<>]/.test(newPassword));
    };

    const isPasswordValid =
    passwordLengthValid &&
    lowercaseValid &&
    uppercaseValid &&
    decimalValid &&
    specialCharacterValid;

  return (
    <>
    <h1 className="text-center font-bold bg-black text-white py-2">Registration</h1>
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-4 bg-white rounded shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
  <div className="flex flex-col w-full sm:w-1/2">
    <label>Email:</label>
    <input
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      required
      className="w-full px-3 py-2 border rounded"
    />
  </div>
  <div className="flex flex-col w-full sm:w-1/2">
    <label>Password:</label>
    <input
      type="password"
      value={password}
      onChange={handlePasswordChange}
      required
      className="w-full px-3 py-2 border rounded"
    />
  </div>
</div>


          <div className="password-criteria space-y-2">
            <ul className="list-none p-0">
              <li className="flex items-center">
                {passwordLengthValid ? (
                  <FcCheckmark className="check-icon text-green-600" />
                ) : (
                  <MdOutlineClose className="close-icon text-red-600" />
                )}
                <span className="ml-2">8 or more characters</span>
              </li>
              <li className="flex items-center">
                {lowercaseValid ? (
                  <FcCheckmark className="check-icon text-green-600" />
                ) : (
                  <MdOutlineClose className="close-icon text-red-600" />
                )}
                <span className="ml-2">1 or more lowercase letters</span>
              </li>
              <li className="flex items-center">
                {uppercaseValid ? (
                  <FcCheckmark className="check-icon text-green-600" />
                ) : (
                  <MdOutlineClose className="close-icon text-red-600" />
                )}
                <span className="ml-2">1 or more uppercase letters</span>
              </li>
              <li className="flex items-center">
                {decimalValid ? (
                  <FcCheckmark className="check-icon text-green-600" />
                ) : (
                  <MdOutlineClose className="close-icon text-red-600" />
                )}
                <span className="ml-2">1 or more decimal characters</span>
              </li>
              <li className="flex items-center">
                {specialCharacterValid ? (
                  <FcCheckmark className="check-icon text-green-600" />
                ) : (
                  <MdOutlineClose className="close-icon text-red-600" />
                )}
                <span className="ml-2">1 or more special characters</span>
              </li>
            </ul>
          </div>

          <button
            type="submit"
            disabled={!isPasswordValid}
            className="w-full bg-black text-white font-bold cursor-pointer px-6 py-2"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
    </>
  );
}