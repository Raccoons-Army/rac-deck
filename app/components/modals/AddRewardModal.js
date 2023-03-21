/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react';
// axios
const axios = require('axios');
// components
import {
    Modal, ModalHeader, ModalBody, ModalFooter,
    Form, FormGroup, Label, Row, Col, Button, Input
} from 'reactstrap';
import HotkeyInput from '../others/HotkeyInput';

// custom hooks
import { useModal, useFormStringInput, useFormNumberInput } from "@/utility/customHooks";

export default function AddRewardModal({ show, close, token, streamerId, reloadContent, ...props }) {


    const rewardName = useFormStringInput("");
    const rewardCost = useFormNumberInput(1, true, true, 1, 1000000000000000000000n);
    const rewardBgColor = useFormStringInput("");
    const [rewardEnabled, setRewardEnabled] = useState(false);
    const [hotkey, setHotkey] = useState("");

    // handle reward submission
    const handleSubmitCustomReward = async () => {
        try {
            const response = await axios.post(
                'https://api.twitch.tv/helix/channel_points/custom_rewards',
                {
                    'title': rewardName.value,
                    'cost': rewardCost.value,
                    'is_enabled': rewardEnabled,
                    'background_color': rewardBgColor.value
                },
                {
                    params: {
                        'broadcaster_id': streamerId
                    },
                    headers: {
                        'client-id': process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID,
                        'Authorization': 'Bearer ' + token,
                        'Content-Type': 'application/json'
                    }
                }
            );

            // reload rewards
            reloadContent(streamerId, token)


            // console.log(response.status);
        } catch (error) {
            // handleError(error)
            console.error(error);
        }
    }

    const handleError = (error) => {
        // check Response Codes https://dev.twitch.tv/docs/api/reference/#create-custom-rewards
        switch (error.response.data.status) {
            case 400:
                if (error.response.data.message.includes("Missing required parameter")) // SHOW ALERT

                    break;

            default:
                break;
        }
    }

    return (
        <>
            <Modal size='lg' isOpen={show} toggle={close} {...props}>
                <ModalHeader toggle={close}>Add Custom Reward </ModalHeader>
                <ModalBody>
                    Sadly Twitch only allows some fields on the creation of a custom reward,
                    but don't worry! You can still add/change them on
                    <a target="_blank" style={{ color: 'blue' }} href='https://dashboard.twitch.tv/viewer-rewards/channel-points/rewards'> your dashboard</a>!
                    <br /><br />
                    <Form>
                        <Row>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="rewardName">
                                        Reward name
                                    </Label>
                                    <Input
                                        id="rewardName"
                                        name="rewardName"
                                        placeholder="give a name to your reward"
                                        type="text"
                                        onChange={rewardName.handleChange}
                                        required
                                    />
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="rewardCost">
                                        Cost
                                    </Label>
                                    <Input
                                        id="rewardCost"
                                        name="rewardCost"
                                        placeholder="give a cost to your reward"
                                        type="number"
                                        onChange={rewardCost.handleChange}
                                        value={rewardCost.value}
                                        min={1}
                                        max={1000000000000000000000n}

                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <FormGroup>
                                <Label for="rewardBgColor">
                                    Background color
                                </Label>
                                <Input
                                    id="rewardBgColor"
                                    name="rewardBgColor"
                                    placeholder="color placeholder"
                                    type="color"
                                    onChange={rewardBgColor.handleChange}
                                />
                            </FormGroup>
                        </Row>
                        <Row>
                            <Col>
                                <FormGroup switch>
                                    <Input type="switch" role="switch" onChange={() => setRewardEnabled(!rewardEnabled)} />
                                    <Label check>enable your reward</Label>
                                </FormGroup>
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <FormGroup>
                                <Label for="hotkey">
                                    Hotkey <small style={{ color: 'gray' }} >(optional)</small>
                                </Label>
                                <HotkeyInput
                                    id="hotkey"
                                    name="hotkey"
                                    hotkey={hotkey}
                                    setHotkey={setHotkey}
                                />
                            </FormGroup>
                        </Row>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={handleSubmitCustomReward}>
                        Add
                    </Button>{' '}
                    <Button color="secondary" onClick={close}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    )
}