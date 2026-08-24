import { StatusCodes } from "http-status-codes"

export default function NotFound (res,message,status) {
    return res.status(status || StatusCodes.NOT_FOUND).json({
        Message : message,
    })
}

