import React, { FC } from "react";
import { useEffect, useState } from "react"
import { useLocation, useParams } from "react-router-dom"
import { getRestaurant, getRestaurantReviews, postRestaurantReview } from "../../service/api";
import RestaurantDetail from "../../components/organisms/RestaurantDetail";
import { RestaurantType, ReviewCustomType } from "../../@types";
import { useAuth0 } from "@auth0/auth0-react";


export const RestaurantDetailPage: FC = () => {
    const [restaurant, setRestaurant] = useState<RestaurantType | null>(null)
    const [reviews, setReviews] = useState<ReviewCustomType | null>(null)

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

    return <RestaurantDetail
        params={params}
        reviews={reviews}
        restaurant={restaurant}
        perPage={perPage}
        page={page}
        handleFormSubmit={handleFormSubmit}
    />
}
