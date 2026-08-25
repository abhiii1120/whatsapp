import * as authUtils from '../utils/auth.utils.js';
import NotFound from '../utils/errors/NotFound.js';

export const authUser = async (req,res,next) => {
    const accessToken = req.headers['authorization']?.split(' ')[1];

    if(!accessToken){
        return NotFound(res,'Access token is missing.');
    }

    try {
        const decoded = authUtils.verifyAccessToken(accessToken);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        return NotFound(res,'Invalid access token')
    }
}