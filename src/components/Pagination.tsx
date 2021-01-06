import React, { FC } from "react";
import { Link } from "react-router-dom"

type Props = {
    path: string;
    page: number;
    perPage: number;
    count: number;
}

const Pagination: FC<Props> = ({ path, page, perPage, count }) => {
    return(
        <nav className="pagination is-centered">
            <Link
                className="pagination-previous"
                to={`${path}?page=${page - 1}`}
                aria-disabled={page === 1}
            >
                前の{ perPage }件
            </Link>
            <Link
                className="pagination-next"
                to={`${path}?page=${page + 1}`}
                aria-disabled={perPage * page >= count}
            >
             次の{perPage}件
            </Link>
        </nav>
    )
}

export default Pagination
