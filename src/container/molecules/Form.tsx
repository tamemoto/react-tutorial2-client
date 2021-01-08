import React, { FC } from "react"
import {useAuth0} from "@auth0/auth0-react"

type Props = {
    onsubmit: (record: any) => Promise<any>
}

const Form: FC<Props> = ({ onsubmit }) => {

    const { isAuthenticated } = useAuth0()

    const handleSubmit = (event: any) => {
        event.preventDefault()
        if(onsubmit) {
            const record = {
                title: event.target.elements.title.value,
                comment: event.target.elements.comment.value
            }
            event.target.elements.title.value = ""
            event.target.elements.title.value = ""
            onsubmit(record)
        }
    }

    return(
        <form onSubmit={handleSubmit}>
            <div className="field">
                <div className="control">
                    <label className="label">タイトル</label>
                    <div className="control">
                        <input
                            name="title"
                            className="input"
                            required
                            disabled={!isAuthenticated}
                        />
                    </div>
                </div>
            </div>
            <div className="field">
                <div className="control">
                    <label className="label">コメント</label>
                    <div className="control">
                        <textarea
                            name="comment"
                            className="textarea"
                            required
                            disabled={!isAuthenticated}
                        ></textarea>
                    </div>
                </div>
            </div>
            <div className="field">
                <div className="control">
                    <button
                        type="submit"
                        className="button is-warning"
                        disabled={!isAuthenticated}
                    >
                        レビューを投稿
                    </button>
                </div>
            </div>
        </form>
    )
}

export default Form
