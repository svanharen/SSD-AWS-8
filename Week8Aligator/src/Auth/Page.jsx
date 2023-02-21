import SignupForm from "./SignupForm"
import LoginForm from "./LoginForm"
import ForgotPassword from "./ForgotPassword"
import ConfirmEmail from "./ConfirmEmail"
import ResetPassword from "./ResetPassword"
import HomePage from "../HomePage"

import {useState} from "react"

import * as cognito from "../cognito"
export default function Page() {
    
    const [errorMessage, setErrorMessage] = useState(null)
    const [page, setPage] = useState("signup")

    const handleSignup = async ({ username, email, password, confirmPassword}) => {
        console.log("Signup form submitted",{ username, email, password, confirmPassword} )

        if(password != confirmPassword) {
            setErrorMessage("Passwords don't match")
            return
        }

        setErrorMessage("");

        try {
            await cognito.signUp({username, email, password})
            setPage("confirm") 
        }catch(error){
            console.error(error)
            setErrorMessage("Error signing up")
        }
    }

    const handleConfirmEmail = async ({username, code}) => {
        try {
            await cognito.confirmUser({username, code})
            setPage("home")
        }catch(error){
            console.error(error);
            setErrorMessage("Error confirming email")
        }
    }

    const handleLogin = async ({username, password}) => {
        console.log("Logged in", {username, password})

        try{
            await cognito.signIn({username, password})
            setPage("home")
        }catch(error){
            console.error(error);
            setErrorMessage("Error logging in")
        }
    }

    const handleForgotPassword = async ({username}) => {
        console.log("Forgot password", {username})

        try{
            await cognito.forgotPassword({username})
            setPage("reset")
        }catch(error){
            console.error(error);
            setErrorMessage("Error resetting password")
        }
    }

    const handleResetPassword = async ({username, code, newPassword}) => {
        console.log("Reset password", {username, code, newPassword})

        try{
            await cognito.resetPassword({username, code, newPassword})
            setPage("home")
        }catch(error){
            console.error(error);
            setErrorMessage("Error resetting password")
        }
    }

    const handleSignout = async () => {
        console.log("Signout")

        try{
            await cognito.signOut()
            setPage("login")
        }catch(error){
            console.error(error);
            setErrorMessage("Error signing out")
        }
    }

    let currentForm = null;
    switch(page) {
        case "signup":
            currentForm = <SignupForm onSubmit={handleSignup} />
            break
        case "confirm":
            currentForm = <ConfirmEmail onSubmit={handleConfirmEmail} />
            break
        case "login":
            currentForm = <LoginForm onSubmit={handleLogin} />
            break
        case "forgot":
            currentForm = <ForgotPassword onSubmit={handleForgotPassword} />
            break
        case "reset":
            currentForm = <ResetPassword onSubmit={handleResetPassword} />
            break
        case "home":
            currentForm = <HomePage onSubmit={handleSignout}/>
            break
    }

    return(
        <div className="flex flex-col justify-center items-center h-screen">
            {currentForm}
            <div className="flex px-8 pt-6 pb-8 mb-4 justify-center items-center">
                {page === "signup" &&(
                    <button className= "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-5 rounded focus:outline-none focus:shadow-outline" 
                    onClick={()=> setPage("login")}>Already registered? Login now</button>
                )}
                {page === "login" &&(
                    <section>
                        <button className= "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-5 rounded focus:outline-none focus:shadow-outline" 
                        onClick={()=> setPage("signup")}>Not signed up? Sign up now</button>
                        <button className= "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-5 rounded focus:outline-none focus:shadow-outline" 
                        onClick={()=> setPage("forgot")}>Forgot Password?</button>
                    </section>
                    
                )}
                {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            </div>
        </div>
    )
}