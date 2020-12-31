import React, { FC } from "react"
import Datetime from "./Datetime"

const Review: FC<{ review: any }> = ({ review }) => {
    return(
        <article className="message is-dark">
            <div className="message-body p-2 pl-3">
                <h3 className="title is-5 mb-0">{review.title}</h3>
                <p className="has-text-right">
                    <small>
                        by { review.user.nickname } さん
                        <br />
                        <Datetime date={new Date(review.createdAt)}/>
                    </small>
                </p>
            </div>
        </article>
    )
}

export default Review
