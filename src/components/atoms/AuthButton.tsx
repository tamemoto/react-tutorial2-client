import React, { FC } from "react"

type Props = {
    handleButton: () => void
    text: string
}

const AuthButton: FC<Props> = ({ handleButton, text }) => {
    return (
        <button
            className="button is-warning is-inverted is-outlined"
            onClick={handleButton}
        >
            { text }
        </button>
    )
}

export default AuthButton
