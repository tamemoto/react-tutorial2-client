import React, { FC } from "react";
import { useEffect, useState } from "react"
import { useLocation, useParams } from "react-router-dom"
import { getRestaurant, getRestaurantReviews, postRestaurantReview } from "../service/api";
import Breadcrumb from "../components/Breadcrumb"
import Loading from "../components/Loading"
import Pagination from "../components/Pagination"
import Review from "../components/Review"
import { useAuth0 } from "@auth0/auth0-react";


const Form: FC<{ onSubmit: any }> = ({ onSubmit }) => {

    const { isAuthenticated } = useAuth0()

    const handleFormSubmit = (event: any) => {
        event.preventDefault()
        if(onSubmit) {
            const record = {
                title: event.target.elements.title.value,
                comment: event.target.elements.comment.value
            }
            event.target.elements.title.value = ""
            event.target.elements.title.value = ""
            onSubmit(record)
        }
    }

    return(
        <form onSubmit={handleFormSubmit}>
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


const Restaurant: FC<{restaurant: any,reviews: any, page: any, perPage: any}> = ({ restaurant, reviews, page, perPage }) => {
    return (
        <>
            <article className="box">
                <h3 className="title is-5">{restaurant.name}</h3>
                <div className="columns">
                    <div className="column is-6">
                        <figure className="image is-square">
                            <img
                                src={restaurant.image || "/images/restaurants/noimage.png"}
                                alt={restaurant.name}
                            />
                        </figure>
                    </div>
                    <div className="column is-6">
                        <figure className="image is-square">
                            <div
                                className="has-ratio"
                                dangerouslySetInnerHTML={{ __html: restaurant.map }}
                            ></div>
                        </figure>
                    </div>
                </div>
            </article>
            <div className="box">
                {reviews.rows.length === 0 ? (
                    <p>レビューがまだありません。</p>
                ) : (
                    <>
                        <div className="block">
                            <p>{reviews.count}件のレビュー</p>
                        </div>
                        <div className="block">
                            {reviews.rows.map((review: any) => {
                                return <Review key={review.id} review={review} />;
                            })}
                        </div>
                        <div className="block">
                            <Pagination
                                path={`/restaurants/${restaurant.id}`}
                                page={page}
                                perPage={perPage}
                                count={reviews.count}
                            />
                        </div>
                    </>
                )}
            </div>
        </>
    );
}

export const RestaurantDetailPage: FC = () => {
    const [restaurant, setRestaurant] = useState(null)
    const [reviews, setReviews] = useState(null)

    const { getAccessTokenWithPopup } = useAuth0()

    const params: any = useParams()
    const location = useLocation()
    const query = new URLSearchParams(location.search)
    const perPage = 5
    const page = Number(query.get("page")) || 1

    useEffect(() => {
        const fetchData = async () => {
            const res = await getRestaurant(params.restaurantId)
            setRestaurant(res)
        }

        fetchData()
    }, [params.restaurantId])

    useEffect(() => {
        const fetchReview = async () => {
            const res = await getRestaurantReviews(params.restaurantId, { limit: perPage, offset: (page - 1)*perPage })
            setReviews(res)
        }

        fetchReview()
    }, [params.restaurantId, page])

    const handleFormSubmit = async (record: any) => {
        await postRestaurantReview(
            params.restaurantId,
            record,
            getAccessTokenWithPopup
        )

        const data = await getRestaurantReviews(params.restaurantId, {
            limit: perPage,
            offset: (page - 1) * perPage
        })

        setReviews(data)
    }


    return (
        <>
            <div className="box">
                <Breadcrumb
                    links={[
                        { href: "/", content: "Top" },
                        { href: "/restaurants", content: "ラーメン店一覧" },
                        {
                            href: `/restaurants/${params.restaurantId}`,
                            content:`hoge の情報`,
                            active: true,
                        },
                    ]}
                />
            </div>
            {restaurant == null || reviews == null ? (
                <Loading />
            ) : (
                <Restaurant
                    restaurant={restaurant}
                    reviews={reviews}
                    page={page}
                    perPage={perPage}
                />
            )}
            <div className="box">
                <Form onSubmit={handleFormSubmit} />
            </div>
        </>
    );
}
