import React from 'react';
import { Button } from 'reactstrap';

// auth
import {withAuthTwitch} from '@/components/auth/withAuthTwitch'


// server side
export const getServerSideProps = withAuthTwitch(context => {
    // Your normal `getServerSideProps` code here
    return { props: {} };
});


export default function Rewards() {
    return (
        <>
            <Button color="danger">Danger!</Button>
            <Button color="danger">Danger!</Button>
        </>
    )
}