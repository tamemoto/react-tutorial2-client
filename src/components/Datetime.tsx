import React, {FC} from "react"

const Datetime:FC<{ date: Date }> = ({ date }) => {

    const padZero = (x: number, digits: number) => {
        return x.toString().padStart(digits, "0")
    }

    return(
        <time dateTime={date.toString()}>
            {padZero(date.getFullYear(), 4)}-{padZero(date.getMonth()+1, 2)}-
            {padZero(date.getDate(), 2)} {padZero(date.getHours(), 2)}:
            {padZero(date.getMinutes(), 2)}
        </time>
    )
}

export default Datetime
