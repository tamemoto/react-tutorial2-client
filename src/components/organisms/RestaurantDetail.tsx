import React, { FC } from "react"
import Breadcrumb from "../molecules/Breadcrumb";
import Loading from "../atoms/Loading";
import Restaurant from "../../container/molecules/Restaurant";
import Form from "../../container/molecules/Form";
import { RestaurantType, ReviewCustomType } from "../../@types";

type Props = {
    params: any;
    reviews: ReviewCustomType | null
    restaurant: RestaurantType | null
    perPage: number,
    page: number,
    handleFormSubmit: (record: any) => Promise<void>
}

const RestaurantDetail: FC<Props> = ({ params, restaurant, reviews, perPage, page, handleFormSubmit }) => {
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
                <Form onsubmit={handleFormSubmit} />
            </div>
        </>
    );
}

export default RestaurantDetail
