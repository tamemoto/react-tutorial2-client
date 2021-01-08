import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { RestaurantCustomType } from "../../@types";
import RestaurantList from "../../components/organisms/RestaurantList";

import { getRestaurants } from "../../service/api";

export const RestaurantListPage = () => {
    const [restaurants, setRestaurants] = useState<RestaurantCustomType | null>(null)

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

    return <RestaurantList
        restaurants={restaurants}
        page={page}
        perPage={perPage}
    />
}
