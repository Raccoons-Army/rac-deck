
// hooks
import { useState } from 'react';
// axios
const axios = require('axios');
// components
import { Form, FormGroup, Label, Input } from 'reactstrap';

export default function Example(props) {
    const [state, setState] = useState(props.rewardState);

    // enable/disable reward
    const handleSwitch = async () => {

        try {
            const response = await axios.patch(
                'https://api.twitch.tv/helix/channel_points/custom_rewards',
                {
                    'is_enabled': !state
                },
                {
                    params: {
                        'broadcaster_id': props.streamerId,
                        'id': props.rewardId
                    },
                    headers: {
                        'client-id': process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID,
                        'Authorization': 'Bearer '+ props.token,
                        'Content-Type': 'application/json'
                    }
                }
            );

            // change switch state
            setState(!state);

        } catch (error) {
            console.error(error)
        }

    }

    return (
        <Form>
            <FormGroup switch>
                <Input
                    type="switch"
                    checked={state}

                    onChange={async () => {
                        await handleSwitch()
                    }}
                />
                <Label check>quick enable/disable</Label>
            </FormGroup>
        </Form>
    );
}
