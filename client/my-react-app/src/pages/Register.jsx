import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Register() {

  const {registerinfo, regsiterError, registerLoading, isAccountCreated, updateRegisterInfo, registerUser} = useContext(AuthContext)
 

  return (
    <div className="flex flex-col gap-4 items-center m-[150px]">
      <h1 className="text-2xl"> Register </h1>
      <form onSubmit={registerUser} className="flex flex-col gap-4 w-80">
          <input type="text" placeholder="Name" className="border rounded-md py-1 px-4 text-black" onChange={(e) => updateRegisterInfo({
            ...registerinfo, name: e.target.value
          })} />
          <input type="text" placeholder="Email" className="border rounded-md py-1 px-4 text-black"  onChange={(e) => updateRegisterInfo({
            ...registerinfo, email: e.target.value
          })}  />
          <input type="text" placeholder="Password" className="border rounded-md py-1 px-4 text-black"  onChange={(e) => updateRegisterInfo({
            ...registerinfo, password: e.target.value
          })} />

        {registerLoading ? (
           <button className="bg-blue-800 border rounded-md py-1 px-2"> Creating Account </button>
        ) :  <button type="submit" className="bg-blue-800 border rounded-md py-1 px-2"> Register </button> }

        {/* showing this when account created or registered succesfully */}
        {isAccountCreated ? (
          <button className="bg-green-800 border rounded-md py-1 px-2"> Your Account has been Succesfully created </button>
        ) : ''}

        {/* showing this when any error while submitting form */}
        {regsiterError ? (
          <button className="bg-red-800 border rounded-md py-1 px-2">  {regsiterError} </button>
        ) : ''}
      </form>
    </div>
  );
}
