import { createContext, useEffect, useState } from "react";
import { baseurl, postApi } from "../utils/services";
import { json, useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {

    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [regsiterError, setRegsiterError] = useState(null);
    const [registerLoading, setRegisterLoading] = useState(null);
    const [isAccountCreated, setIsAccountCreated] = useState(false);
    const [registerinfo, setRegisterInfo] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: ''
    });


    useEffect(() => {
        const user = localStorage.getItem('user');
        setUser(JSON.parse(user));
    }, []);
   
    const updateRegisterInfo = (info) => {
        setRegisterInfo(info)
    }

    // calling this when function when user register itself first time 
    const updateUser = () => {
        const user = localStorage.getItem('user');
        setUser(JSON.parse(user));
    };
    
    // calling register api to create user account
    const registerUser = async(e) => {
        e.preventDefault()
        setRegisterLoading(true)
        const response = await postApi(`${baseurl}/users/register`, registerinfo)
        setRegisterLoading(false)
        if(response.error){
            console.log(response, response.error)
            setRegsiterError(response.error)
        }else{
            console.log("User created Succesfully", response.data)
            setRegsiterError('');
            setIsAccountCreated(true);
            localStorage.setItem('user', JSON.stringify(response.data));
            updateUser()
            navigate('/chat');
        }
    };

    //calling login api
    const loginUser = async(e) => {
        e.preventDefault()
        const response = await postApi(`${baseurl}/users/login`, loginInfo)
        if (response.error){
            setRegsiterError(response.error)
        }else{
            setRegsiterError('')
            localStorage.setItem('user', JSON.stringify(response.data));
            updateUser()
            navigate('/chat')
        }
    }

    // creating request body here
    const updateLoginInfo = (info) => {
        setLoginInfo(info)
    }

    // logout function
    const logoutfunc = () => {
        setUser(null)
        localStorage.removeItem('user')
        navigate('/login')
    }

    return(
        <AuthContext.Provider
        value={{
            user,
            registerinfo,
            regsiterError,
            registerLoading,
            isAccountCreated,
            loginInfo,
            updateLoginInfo,
            loginUser,
            updateRegisterInfo,
            registerUser,
            logoutfunc
        }}
        >
            {children}
        </AuthContext.Provider>
    )
}
