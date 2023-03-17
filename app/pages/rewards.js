import React from 'react';
import { Button } from 'reactstrap';

// auth
import { withAuthTwitch } from '@/components/auth/withAuthTwitch'


// server side
export const getServerSideProps = withAuthTwitch(context => {
    let props = {}
    
    // define props to sidebar read them
    props.twitchAccessToken = context.req.cookies.twitchAcessTokenInfo ? JSON.parse(context.req.cookies.twitchAcessTokenInfo) : {};
    props.discordAccessToken = context.req.cookies.discordAcessTokenInfo ? JSON.parse(context.req.cookies.discordAcessTokenInfo) : {};

    return { props };
});



export default function Rewards() {
    return (
        <>
            <Button color="danger">Danger!</Button>
            <Button color="danger">Danger!</Button>
        </>
    )
}