import { StatusCodes } from 'http-status-codes'

export default function buildSuccessResponse (res,message,data,statusCodes) {
    return res.status( statusCodes || StatusCodes.OK ).json({
        message,
        data,
    })
}