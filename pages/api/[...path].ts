import {NextApiRequest, NextApiResponse} from "next";
import httpProxyMiddleware from "next-http-proxy-middleware";

export default (req: NextApiRequest, res: NextApiResponse) => {
    return httpProxyMiddleware(req, res, {
        target: process.env.NOTES_API_URL,
        pathRewrite: [{
            patternStr: '^/api',
            replaceStr: ''
        }]
    });
}