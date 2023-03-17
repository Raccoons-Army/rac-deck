// axios
import { serialize } from 'cookie';

// remove twitch cookie
export default async function handler(req, res) {

    // saves token in a cookie
    res.setHeader('Set-Cookie', serialize('twitchAcessTokenInfo', '', { maxAge: -1, path: '/' }));

    return res.status(200).redirect(307, `/connections`)


}
