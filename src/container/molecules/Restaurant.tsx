import React, {FC} from "react";
import Review from "../../components/molecules/Review";
import Pagination from "../../components/molecules/Pagination";
import {RestaurantType, ReviewCustomType} from "../../@types";

type Props = {
    restaurant: RestaurantType;
    reviews: ReviewCustomType;
    page: number;
    perPage: number
}

const Restaurant: FC<Props> = ({ restaurant, reviews, page, perPage }) => {
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

export default Restaurant
