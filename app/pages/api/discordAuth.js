// axios
import axios from 'axios';
import { serialize } from 'cookie';

// discord auth redirects to this endpoint 
export default async function handler(req, res) {

  let response = ""

  // gets acess token
  try {
    response = await axios.post(
      'https://id.twitch.tv/oauth2/token',
      `client_id=${process.env.twitchClientId}&client_secret=${process.env.twitchSecretClient}&code=${req.query.code}&grant_type=authorization_code&redirect_uri=http://localhost:3000/connections`,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );

    // saves token in a cookie
    res.setHeader('Set-Cookie', serialize('twitchAcessTokenInfo',  JSON.stringify(response.data), { path: '/' }));

    // redirects to connections page
    return res.status(200).redirect(307, `/connections?access_token=${response.data.access_token}&expires_in=${response.data.expires_in}&refresh_token=${response.data.refresh_token}`)


  } catch (error) {
    console.error(error);
    return res.status(500).redirect(307, "/");

  }


}
