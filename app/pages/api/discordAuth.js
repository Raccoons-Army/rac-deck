// axios
import axios from 'axios';
import { serialize } from 'cookie';

// discord auth redirects to this endpoint 
export default async function handler(req, res) {

  // gets acess token
  let responsePost = ""
  try {
    responsePost = await axios.post(
      'https://discord.com/api/oauth2/token',
      `client_id=${process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID}&client_secret=${process.env.NEXT_PUBLIC_DISCORD_CLIENT_SECRET}&code=${req.query.code}&grant_type=authorization_code&redirect_uri=http://localhost:3000/api/discordAuth`,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );


    // gets the discord user info
    let responseGet = ""
    try {
      responseGet = await axios.get(
        'https://discord.com/api/users/@me',
        {
          headers: {
            'Authorization': 'Bearer ' + responsePost.data.access_token,
            'Client-Id': process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID
          }
        }
      );

      // saves token and discord user in cookies
      res.setHeader('Set-Cookie', [
        serialize('discordAcessTokenInfo', JSON.stringify(responsePost.data), { httpOnly: true, path: '/' }),
        serialize('discordUserData', JSON.stringify(responseGet.data), { httpOnly: true, path: '/' })
      ]);


      // redirects to connections page
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

