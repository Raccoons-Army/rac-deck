import React from 'react';
import { Button } from 'reactstrap';
// axios
import axios from 'axios';
// auth
import { withAuthTwitch } from '@/components/auth/withAuthTwitch'


// server side
export const getServerSideProps = withAuthTwitch(async (context) => {
    let props = {}

    console.log("test");
    // define props to sidebar read them
    props.twitchAccessToken = context.req.cookies.twitchAcessTokenInfo ? JSON.parse(context.req.cookies.twitchAcessTokenInfo) : null;
    props.discordAccessToken = context.req.cookies.discordAcessTokenInfo ? JSON.parse(context.req.cookies.discordAcessTokenInfo) : null;

    // call twitch endpoint

    // gets twitch rewards
    try {
        const response = await axios.get('https://api.twitch.tv/helix/channel_points/custom_rewards', {
            params: {
                'broadcaster_id': '274637212'
            },
            headers: {
                'Authorization': 'Bearer ' + props.twitchAccessToken,
                'Client-Id': process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID
            }
        });

        props.data = response.data;
        console.log(response.data);


    } catch (error) {
        console.error(error);
    }

    return { props };
});



export default function Rewards({ props }) {
    return (
        <>
            <Button color="danger">Danger!</Button>
            <Button color="danger">Danger!</Button>
        </>
    )
}