import {useAuth0} from "@auth0/auth0-react";
import AuthButton from "../../components/atoms/AuthButton";
import LoadingButton from "../../components/atoms/LoadingButton";
import React from "react";

const EnhancedAuthButton = () => {
    const { isLoading, isAuthenticated, loginWithRedirect, logout } = useAuth0()

    const handleClickLoginButton = () => {
        loginWithRedirect({
            appState: {
                path: window.location.pathname
            }
        })
    }

    const handleClickLogoutButton = () => {
        logout({
            localOnly: true,
        })
    }

    if(isLoading) {
        return <LoadingButton />
    }

    if(isAuthenticated) {
        return <AuthButton handleButton={handleClickLogoutButton} text={"ログアウト"}/>
    }

    return <AuthButton handleButton={handleClickLoginButton} text={"ログイン"}/>
}

export default EnhancedAuthButton
