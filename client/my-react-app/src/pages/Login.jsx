import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

export default function Login() {

  const {user, loginInfo, loginUser, loginLoading, updateLoginInfo, regsiterError} = useContext(AuthContext)

  return (
    <div className="flex flex-col gap-4 items-center m-[150px]">
      <h1 className="text-2xl"> Login </h1>
      <form onSubmit={loginUser} className="flex flex-col gap-4 w-80">
          <input type="text" placeholder="Email" className="border rounded-md py-1 px-4 text-black" onChange={(e) => updateLoginInfo({...loginInfo, 
            email: e.target.value })} />
          <input type="text" placeholder="Password" className="border rounded-md py-1 px-4 text-black" onChange={(e) => updateLoginInfo({
            ...loginInfo, password: e.target.value
          })} />
        <button type='submit' className="bg-blue-800 border rounded-md py-1 px-2"> {loginLoading ? 'Loading...' : 'Login' }  </button>

        {/* showing this when any error while submitting form */}
        {regsiterError ? (
          <button className="bg-red-800 border rounded-md py-1 px-2">  {regsiterError} </button>
        ) : ''}
      </form>
    </div>
  )
}
