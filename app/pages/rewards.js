import React from 'react';
// axios
import axios from 'axios';
// auth
import { withAuthTwitch } from '@/components/auth/withAuthTwitch'
// components
import { CardGroup, Card, CardBody, CardTitle, CardSubtitle, CardText, Button, Col } from 'reactstrap';
import Image from 'next/image'
import RewardSwitch from '@/components/others/RewardSwitch'
import { InputGroup, FormGroup, Label, Input } from 'reactstrap';

// server side
export const getServerSideProps = withAuthTwitch(async (context) => {
    let props = {}

    // parse and define props to sidebar read them
    props.twitchAccessToken = context.req.cookies.twitchAcessTokenInfo ? JSON.parse(context.req.cookies.twitchAcessTokenInfo) : null;
    props.discordAccessToken = context.req.cookies.discordAcessTokenInfo ? JSON.parse(context.req.cookies.discordAcessTokenInfo) : null;
    let streamerData = JSON.parse(context.req.cookies.streamerData);

    // gets twitch rewards
    try {
        const response = await axios.get('https://api.twitch.tv/helix/channel_points/custom_rewards', {
            params: {
                'broadcaster_id': streamerData.id,
                'only_manageable_rewards': true
            },
            headers: {
                'Authorization': 'Bearer ' + props.twitchAccessToken.access_token,
                'Client-Id': process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID
            }
        });

        // pass data to props
        props.rewards = response.data.data;
        props.streamerId = streamerData.id

    } catch (error) {
        console.error(error);
    }

    return { props };
});



export default function Rewards(props) {
    return (
        <>
            <CardGroup>
                {props.rewards?.map((reward) => {

                    return (
                        <Col key={reward.id} md={3} style={{ padding: 2 }} lg={3} sm={3} xs={8}>
                            <Card >
                                <Image
                                    alt="Sample"
                                    src={reward.image ? reward.image : reward.default_image.url_4x}
                                    width={50}
                                    height={50}
                                >
                                </Image>
                                <CardBody>
                                    <CardTitle tag="h5">
                                        {reward.title}
                                    </CardTitle>
                                    <CardSubtitle
                                        className="mb-2 text-muted"
                                        tag="h6"
                                    >
                                        {reward.cost} channel points
                                    </CardSubtitle>
                                    <CardText>
                                        {reward.prompt}
                                    </CardText>
                                    <RewardSwitch token={props.twitchAccessToken.access_token} streamerId={props.streamerId} rewardId={reward.id} rewardState={reward.is_enabled} />
                                    <Button>
                                        Change
                                    </Button>
                                </CardBody>
                            </Card>
                        </Col>
                    )
                })}
            </CardGroup>

        </>
    )
}