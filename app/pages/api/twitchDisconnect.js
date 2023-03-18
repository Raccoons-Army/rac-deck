// axios
import { serialize } from 'cookie';

// remove twitch cookie
export default async function handler(req, res) {

    // deletes cookies
    res.setHeader('Set-Cookie', [
        serialize('twitchAcessTokenInfo', '', { maxAge: -1, path: '/' }),
        serialize('streamerData', '', { maxAge: -1, path: '/' }),

    ]);

    return res.status(200).redirect(307, `/connections`)


}
