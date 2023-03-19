import React, { useEffect, useState } from 'react';
// axios
import axios from 'axios';
// auth
import { withAuthTwitch } from '@/components/auth/withAuthTwitch'
// custom hooks
import { useModal } from '@/utility/customHooks'
// components
import { CardGroup, Card, CardBody, CardTitle, CardSubtitle, CardText, Button, Col } from 'reactstrap';
import Image from 'next/image'
import RewardSwitch from '@/components/others/RewardSwitch'
import AddRewardModal from '@/components/modals/AddRewardModal';

// server side
export const getServerSideProps = withAuthTwitch(async (context) => {
    let props = {}

    // parse and define props to sidebar read them
    props.twitchAccessToken = context.req.cookies.twitchAcessTokenInfo ? JSON.parse(context.req.cookies.twitchAcessTokenInfo) : null;
    props.discordAccessToken = context.req.cookies.discordAcessTokenInfo ? JSON.parse(context.req.cookies.discordAcessTokenInfo) : null;
    let streamerData = JSON.parse(context.req.cookies.streamerData);


    // pass data to props
    props.rewards = await getTwitchRewards(streamerData.id, props.twitchAccessToken.access_token); // get twitch rewards
    props.streamerId = streamerData.id

    // console.log(props.rewards);


    return { props };
});

const getTwitchRewards = async (streamerId, token) => {
    // gets twitch rewards
    try {
        const response = await axios.get('https://api.twitch.tv/helix/channel_points/custom_rewards', {
            params: {
                'broadcaster_id': streamerId,
                'only_manageable_rewards': true
            },
            headers: {
                'Authorization': 'Bearer ' + token,
                'Client-Id': process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID
            }
        });

        // pass data to props
        return response.data.data


    } catch (error) {
        console.error(error);
        return {}
    }
}

export default function Rewards(props) {

    // add hotkey modal
    const modalAddReward = useModal(false);
    const [rewards, setRewards] = useState(props.rewards);

    // callback to send to childs components
    const reloadContent = async (streamerId, token) => {
        setRewards(await getTwitchRewards(streamerId, token))
    }


    return (
        <>
            {/*Modals*/}
            {
                modalAddReward.show && (
                    <AddRewardModal
                        fade={false}
                        token={props.twitchAccessToken.access_token}
                        streamerId={props.streamerId}
                        show={modalAddReward.show}
                        close={modalAddReward.handleClose}
                        reloadContent={reloadContent}
                    // modalTransition={Transiti}
                    />
                )
            }

            {/*Add custom reward */}
            <Button type='button' color='success' onClick={modalAddReward.handleOpen}>Add custom reward</Button>

            <CardGroup>
                {rewards?.map((reward) => {
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
                                    <RewardSwitch token={props.twitchAccessToken.access_token}
                                        streamerId={props.streamerId}
                                        rewardId={reward.id}
                                        rewardState={reward.is_enabled}
                                    />
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