// axios
import axios from 'axios';
import { serialize } from 'cookie';

// discord auth redirects to this endpoint 
export default async function handler(req, res) {

  let response = ""

  // gets acess token
  try {
    response = await axios.post(
      'https://discord.com/api/oauth2/token',
      `client_id=${process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID}&client_secret=${process.env.NEXT_PUBLIC_DISCORD_CLIENT_SECRET}&code=${req.query.code}&grant_type=authorization_code&redirect_uri=http://localhost:3000/api/discordAuth`,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );

    // saves token in a cookie
    res.setHeader('Set-Cookie', serialize('discordAcessTokenInfo',  JSON.stringify(response.data), { path: '/' }));

    // redirects to connections page
    return res.status(200).redirect(307, `/connections`)


  } catch (error) {
    console.error(error);
    return res.status(500).redirect(307, "/");

  }


}
