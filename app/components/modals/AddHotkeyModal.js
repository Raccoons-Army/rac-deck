import React, { useState } from 'react';

// components
import {
    Modal, ModalHeader, ModalBody, ModalFooter,
    Form, FormGroup, Label, Row, Col, Button, Input
} from 'reactstrap';
import HotkeyInput from '../others/HotkeyInput';

// custom hooks
import { useModal, useFormStringInput } from "@/utility/customHooks";

export default function AddHotkeyModal({ show, close, ...props }) {

    const channel = useFormStringInput("");
    const changeOnAllServers = useState();
    const nickOrName = useFormStringInput("");
    const [hotkey, setHotkey] = useState("");
    
    return (
        <>
            <Modal size='lg' isOpen={show} toggle={close} {...props}>
                <ModalHeader toggle={close}>Add Hotkey - {props.botMode}</ModalHeader>
                <ModalBody>
                    <Form>
                        <Row>
                            <Col md={6}>
                                <FormGroup>
                                    {props.botMode == "Nick" ?
                                        (<>
                                            <Label for="changeOnAllServers">
                                                Change on all servers
                                            </Label>
                                            <FormGroup switch>
                                                <Input id="changeOnAllServers"
                                                    name="changeOnAllServers"
                                                    type="switch"
                                                />
                                            </FormGroup>
                                        </>)
                                        : // else
                                        <>
                                            <Label for="channel">
                                                Channel
                                            </Label>
                                            <Input id="channel"
                                                name="channel"
                                                type="text"
                                                onChange={channel.handleChange}
                                            />
                                        </>
                                    }

                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="nickOrName">
                                        {props.botMode == "Nick" ? "Nick" : "Channel name"}
                                    </Label>
                                    <Input
                                        id="nickOrName"
                                        name="nickOrName"
                                        type="text"
                                        onChange={nickOrName.handleChange}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <FormGroup>
                                <Label for="hotKey">
                                    Hotkey
                                </Label>
                                <HotkeyInput
                                    id="botToken"
                                    name="botToken"
                                    hotkey={hotkey}
                                    setHotkey={setHotkey}
                                />
                            </FormGroup>
                        </Row>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={close}>
                        Add
                    </Button>{' '}
                    <Button color="secondary" onClick={close}>
                        Close
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    )
}