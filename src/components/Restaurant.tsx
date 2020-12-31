import React, { FC } from "react"
import { Link } from "react-router-dom"
import Review from "./Review"

const Restaurant: FC<{ restaurant: any }> = ({ restaurant }) => {
    return(
        <article className="box">
            <div className="columns">
                <div className="column is-3">
                    <figure>
                        <img
                            src={restaurant.image || "/images/restaurants/noimage.png"}
                            alt={restaurant.name}
                        />
                    </figure>
                </div>
                <div className="column">
                    <h3 className="title is-5">
                        <Link
                            className="has-text-dark"
                            to={`/restaurants/${restaurant.id}`}
                        >
                            { restaurant.name }
                        </Link>
                    </h3>
                    <div>
                        {restaurant.reviews.length === 0 ?(
                            <p>
                                レビューはまだありません
                                <br />
                                <Link to={`/restaurants/${restaurant.id}`}>
                                    レビューを投稿する
                                </Link>
                            </p>
                        ): (
                            restaurant.reviews.map((review: any) => {
                                return <Review key={review.id} review={review}/>
                            })
                        )}
                    </div>
                </div>
            </div>
        </article>
    )
}

export default Restaurant
