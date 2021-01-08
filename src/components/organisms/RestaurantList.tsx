import React, { FC } from "react";
import Breadcrumb from "../Breadcrumb";
import Loading from "../Loading";
import {RestaurantCustomType, RestaurantType} from "../../@types";
import Restaurant from "../Restaurant";
import Pagination from "../Pagination";

type Props = {
    restaurants: RestaurantCustomType | null
    page: number
    perPage: number,
}

const RestaurantList: FC<Props> = ({ restaurants, page, perPage }) => {
    return(
        <>
            <div className="box">
                <Breadcrumb
                    links={[
                        { href: "/", content: "Top" },
                        { href: "/restaurants", content: "ラーメン店一覧" , active: true}
                    ]}/>
            </div>
            {restaurants === null ? (
                <Loading />
            ): (
                <>
                    <div className="block">
                        {restaurants.rows.map((restaurant: RestaurantType) => {
                            return <Restaurant key={restaurant.id} {...restaurant} />
                        })}
                    </div>
                    <div className="block">
                        <Pagination path={"/restaurants"} page={page} perPage={perPage} count={restaurants?.count}/>
                    </div>
                </>
            )}
        </>
    )
}

export default RestaurantList
