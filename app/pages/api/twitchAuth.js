// axios
import axios from 'axios';
import { serialize } from 'cookie';

// twitch auth redirects to this endpoint 
export default async function handler(req, res) {

  let responsePost = ""

  // gets acess token
  try {
    responsePost = await axios.post(
      'https://id.twitch.tv/oauth2/token',
      `client_id=${process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID}&client_secret=${process.env.NEXT_PUBLIC_TWITCH_CLIENT_SECRET}&code=${req.query.code}&grant_type=authorization_code&redirect_uri=http://localhost:3000/connections`,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );

    // gets the streamer info
    let responseGet = ""
    try {
      responseGet = await axios.get(
        'https://api.twitch.tv/helix/users',
        {
          headers: {
            'Authorization': 'Bearer ' + responsePost.data.access_token,
            'Client-Id': process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID
          }
        }
      );

      // saves token and streamer data in cookies
      await res.setHeader('Set-Cookie', [
        serialize('twitchAcessTokenInfo', JSON.stringify(responsePost.data), { httpOnly: true, path: '/' }),
        serialize('streamerData', JSON.stringify(responseGet.data), { httpOnly: true, path: '/' })
      ]);

      // redirects to connections page with success
      return res.status(200).redirect(307, `/connections`)

    } catch (error) {
      handleError(res, error);
    }


  } catch (error) {
    handleError(res, error);
  }


}

const handleError = (res, error) => {
  console.error(error);
  return res.status(500).redirect(307, "/connections");
}
