import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import Breadcrumb from "../components/Breadcrumb"
import Loading from "../components/Loading";
import Pagination from "../components/Pagination";
import Restaurant from "../components/Restaurant";
import { RestaurantType } from "../@types";

import { getRestaurants } from "../service/api";

export const RestaurantListPage = () => {
    const [restaurants, setRestaurants]: any = useState(null)

    const location = useLocation()
    const query = new URLSearchParams(location.search)
    const perPage = 5
    const page = Number(query.get("page")) || 1
    console.log(page)

    useEffect(() => {
        const fetchRestaurants = async () => {
            const res = await getRestaurants({ limit: perPage, offset: (page-1)*perPage })
            console.log(res)
            setRestaurants(res)
        }
        fetchRestaurants()
    }, [page])

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
