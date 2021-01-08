import React, { FC } from "react"
import { Link } from "react-router-dom"

type Prop = {
    href: string;
    content: string | null;
    active?: boolean;
}

const Breadcrumb: FC<{ links: Prop[] }> = ({ links }) => {
    return(
        <nav className="breadcrumb">
            <ul>
                {links.map(({ href, content, active }, i) => {
                   return(
                       <li key={i} className={active ? "is-active": ""}>
                           <Link to={href}>
                               { content }
                           </Link>
                       </li>
                   )
                })}
            </ul>
        </nav>
    )
}

export default Breadcrumb
