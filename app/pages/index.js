
// import styles from '@/styles/Home.module.css'


// check if connected to twitch and discord and pass it to layout component
export async function getServerSideProps(context) {

  let props = {};
  // if it has twitch access token on a cookie
  if (context.req.cookies.twitchAcessTokenInfo) {
    //  unlock twitch pages
    props.twitch = true;

  }

  // if it has discord access token on a cookie
  if (context.req.cookies.discordAcessTokenInfo) {
    //  unlock discord pages
    props.discord = true;
  }

  return { props };

}

export default function Home() {
  return (
    <>

    </>
  )
}
