import React, { useEffect, useState } from 'react';
// axios
import axios from 'axios';
// components
import { Button } from 'reactstrap';
import { serialize } from 'cookie';

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


export default function Rewards(props) {

    const [isDiscordConnected, setIsDiscordConnected] = useState(false);
    const [isTwitchConnected, setIsTwitchConnected] = useState(false);

    // discord
    const handleDiscordConnection = () => {
        const newWindow = window.open(`https://discord.com/oauth2/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID}&scope=email%20identify&redirect_uri=http://localhost:3000/api/discordAuth&prompt=consent
        `, 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null
    }

    // twitch
    const handleTwitchConnection = async (state) => {
        const newWindow = window.open(`https://id.twitch.tv/oauth2/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID}&redirect_uri=http://localhost:3000/api/twitchAuth&scope=channel%3Amanage%3Aredemptions%20user%3Aread%3Aemail`, 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null
    }

    // revoke access tokens
    const handleDisconnection = async (type) => {
        try {
            const response = await axios.post(
                type == 'discord' ? 'https://discord.com/api/oauth2/token/revoke' : 'https://id.twitch.tv/oauth2/revoke',
                type == 'discord' ?
                    `client_id=${process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID}&token=${props.discordAccessToken}&client_secret=${process.env.NEXT_PUBLIC_DISCORD_CLIENT_SECRET}`
                    :
                    `client_id=${process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID}&token=${props.twitchAccessToken}`,
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }
            );

            // check if revoked
            if (response.status == 200) {
                let endpoint = "";

                if (type == 'discord') {

                    // define endpoint
                    endpoint = "/api/discordDisconnect"

                    // set button to false
                    setIsDiscordConnected(false)

                } else {

                    // define endpoint
                    endpoint = "/api/twitchDisconnect"

                    // set button to false
                    setIsTwitchConnected(false);
                }

                // call api to remove cookie
                try {
                    const response = await axios.post(endpoint);

                } catch (error) {
                    console.error(error);
                }
            }
        } catch (error) {
            console.error(error)
        }

    }

    // if twitch is connected
    useEffect(() => {

        if (props.twitchAccessToken) setIsTwitchConnected(true);
        if (props.discordAccessToken) setIsDiscordConnected(true);

    }, [props.twitchAccessToken, props.discordAccessToken])


    return (
        <>
            <h3>Your Connections</h3>
            <hr></hr>

            <p>
                Connect with your accounts to unlock the respective pages and its functionalities
            </p>

            {isDiscordConnected ?
                <Button color="danger" onClick={() => handleDisconnection('discord')}>
                    Disconnect  {' '}
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-discord" viewBox="0 0 16 16">
                        <path d="M13.545 2.907a13.227 13.227 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.19 12.19 0 0 0-3.658 0 8.258 8.258 0 0 0-.412-.833.051.051 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.041.041 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032c.001.014.01.028.021.037a13.276 13.276 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019c.308-.42.582-.863.818-1.329a.05.05 0 0 0-.01-.059.051.051 0 0 0-.018-.011 8.875 8.875 0 0 1-1.248-.595.05.05 0 0 1-.02-.066.051.051 0 0 1 .015-.019c.084-.063.168-.129.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.052.052 0 0 1 .053.007c.08.066.164.132.248.195a.051.051 0 0 1-.004.085 8.254 8.254 0 0 1-1.249.594.05.05 0 0 0-.03.03.052.052 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.235 13.235 0 0 0 4.001-2.02.049.049 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.034.034 0 0 0-.02-.019Zm-8.198 7.307c-.789 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612Zm5.316 0c-.788 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612Z" />
                    </svg>
                </Button>
                : // not connected
                <Button color="success" onClick={handleDiscordConnection}>
                    Connect  {' '}
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-discord" viewBox="0 0 16 16">
                        <path d="M13.545 2.907a13.227 13.227 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.19 12.19 0 0 0-3.658 0 8.258 8.258 0 0 0-.412-.833.051.051 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.041.041 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032c.001.014.01.028.021.037a13.276 13.276 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019c.308-.42.582-.863.818-1.329a.05.05 0 0 0-.01-.059.051.051 0 0 0-.018-.011 8.875 8.875 0 0 1-1.248-.595.05.05 0 0 1-.02-.066.051.051 0 0 1 .015-.019c.084-.063.168-.129.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.052.052 0 0 1 .053.007c.08.066.164.132.248.195a.051.051 0 0 1-.004.085 8.254 8.254 0 0 1-1.249.594.05.05 0 0 0-.03.03.052.052 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.235 13.235 0 0 0 4.001-2.02.049.049 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.034.034 0 0 0-.02-.019Zm-8.198 7.307c-.789 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612Zm5.316 0c-.788 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612Z" />
                    </svg>
                </Button>
            }

            {' '}

            {isTwitchConnected ?
                <Button color="danger" onClick={() => handleDisconnection('twitch')}>
                    Disconnect  {' '}
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-twitch" viewBox="0 0 16 16">
                        <path d="M3.857 0 1 2.857v10.286h3.429V16l2.857-2.857H9.57L14.714 8V0H3.857zm9.714 7.429-2.285 2.285H9l-2 2v-2H4.429V1.143h9.142v6.286z" />
                        <path d="M11.857 3.143h-1.143V6.57h1.143V3.143zm-3.143 0H7.571V6.57h1.143V3.143z" />
                    </svg>
                </Button>
                : // not connected
                <Button color="success" onClick={handleTwitchConnection} >
                    Connect  {' '}
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-twitch" viewBox="0 0 16 16">
                        <path d="M3.857 0 1 2.857v10.286h3.429V16l2.857-2.857H9.57L14.714 8V0H3.857zm9.714 7.429-2.285 2.285H9l-2 2v-2H4.429V1.143h9.142v6.286z" />
                        <path d="M11.857 3.143h-1.143V6.57h1.143V3.143zm-3.143 0H7.571V6.57h1.143V3.143z" />
                    </svg>
                </Button>
            }
        </>
    )
}