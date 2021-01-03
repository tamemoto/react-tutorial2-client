const request = async (path: string, options : any = {}): Promise<any> => {
    const url = `${process.env.REACT_APP_API_ORIGIN}${path}`
    const response = await fetch(url, options)
    return response.json()
}


export const getRestaurants = async (args: any = {}) => {
    const params = new URLSearchParams(args)
    return request(`/restaurants?${params.toString()}`)
}

export const getRestaurant = async (restaurantId: number) => {
    return request(`/restaurants?${restaurantId.toString()}`)
}

export const getRestaurantReviews = async (restaurantId: number, args: any = {}) => {
    const params = new URLSearchParams(args)
    return request(`/restaurants/${restaurantId}/reviews?${params.toString()}`)
}

export const postRestaurantReview = async (
    restaurantId: string,
    record: any,
    getAccessToken: any
) => {
    const token = await getAccessToken({
        audience: process.env.REACT_APP_AUTH0_AUDIENCE
    })

    return request(`/restaurants/${restaurantId}/reviews`, {
        body: JSON.stringify(record),
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        method: "POST"
    })
}
