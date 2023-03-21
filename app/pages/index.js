
// import styles from '@/styles/Home.module.css'

// before the page loads, pass user access token value as 
export async function getServerSideProps(context) {

  let props = {};

  // if it has twitch access token on a cookie
  if (context.req.cookies.twitchAcessTokenInfo) {
    // parse cookies
    const twitchAccessToken = JSON.parse(context.req.cookies.twitchAcessTokenInfo)

    // pass it to props
    props.twitchAccessToken = twitchAccessToken.access_token;
  }

  // if it has discord access token on a cookie
  if (context.req.cookies.discordAcessTokenInfo) {
    // parse cookies
    const discordAccessToken = JSON.parse(context.req.cookies.discordAcessTokenInfo)

    // pass it to props
    props.discordAccessToken = discordAccessToken.access_token;

  }

  return { props };

}


export default function Home() {
  return (
    <>

    </>
  )
}
