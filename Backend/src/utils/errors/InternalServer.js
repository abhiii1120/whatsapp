import {StatusCodes} from "http-status-codes"

export const InternalServerError = (res,message) => {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        Message:message
    })
}