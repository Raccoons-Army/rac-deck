import React, { useState } from 'react';

// auth
import { withAuthDiscord } from '@/components/auth/withAuthDiscord'

// components
import { Form, Row, Col, FormGroup, Label, Input, Button } from 'reactstrap';
import HotkeysTable from '@/components/tables/HotkeysTable';
import HotkeyInput from '@/components/others/HotkeyInput'
import AddHotkeyModal from '@/components/modals/AddHotkeyModal';

// custom hooks
import { useFormStringInput, useFormSwitchInput, useFormSelectBox, useModal } from '@/utility/customHooks'

// server side
export const getServerSideProps = withAuthDiscord(context => {
    let props = {}
    
    // define props to sidebar read them
    props.twitchAccessToken = context.req.cookies.twitchAcessTokenInfo ? JSON.parse(context.req.cookies.twitchAcessTokenInfo) : {};
    props.discordAccessToken = context.req.cookies.discordAcessTokenInfo ? JSON.parse(context.req.cookies.discordAcessTokenInfo) : {};

    return { props };
});

export default function ChangeNameBot() {

    // main info
    const [botStatus, setBotStatus] = useState("off");
    const botToken = useFormStringInput("test")
    const changeOnStart = useFormSwitchInput(false);
    const botMode = useFormSelectBox(["Nick", "Channel"], "Nick")

    // nick info
    const discordId = useFormStringInput("")
    const changeOnAllServers = useFormSwitchInput(false);

    // channel info
    const serverId = useFormStringInput("")

    // add hotkey modal
    const modalAddHotkey = useModal(false);

    // handle status bot
    const handleStatusBot = () => {
        switch (botStatus) {
            case "off":
                //TODO -> turn on the bot -> while is booting the process, set the botStatus to loading
                break;
            case "on":
                //TODO -> turn off the bot
                break;
            default:
                break;
        }
    }

    // render bot's status button
    const renderBotStatusButton = () => {
        switch (botStatus) {
            case "off":
                return <Button type='button' onClick={handleStatusBot} color='success'>Turn On</Button>
            case "on":
                return <Button type='button' onClick={handleStatusBot} color='danger'>Turn Off</Button>
            case "loading":
                return <Button type='button' onClick={handleStatusBot} color='info' disabled>Booting</Button>
            default:
                break;
        }
    }

    return (
        <>

            {/*Modals*/}
            {
                modalAddHotkey.show && (
                    <AddHotkeyModal
                        fade={false}
                        // modalTransition={Transiti}
                        botMode={botMode.value}
                    />
                )
            }

            <h3>Info</h3>
            <hr></hr>
            {renderBotStatusButton()}
            <br /><br />

            <h3>Main</h3>
            <hr></hr>
            <Form>
                <Row>
                    <Col md={3}>
                        <FormGroup>
                            <Label for="exampleEmail">
                                Bot Token
                            </Label>
                            <Input
                                id="botToken"
                                name="botToken"
                                placeholder="paste your bot token here"
                                type="password"
                                onChange={botToken.handleChange}
                            />
                        </FormGroup>
                    </Col>
                    <Col md={3}>
                        <FormGroup>
                            <Label for="botMode">
                                Bot Mode
                            </Label>
                            <Input
                                id="exampleSelect"
                                name="select"
                                type="select"
                                onChange={botMode.handleChange}
                            >
                                {
                                    botMode.options.map((x, i) => {
                                        return (
                                            <option key={"mode:" + x} value={x}>
                                                {x}
                                            </option>
                                        )
                                    })
                                }
                            </Input>
                        </FormGroup>
                    </Col>
                    <Col md={3}>
                        <Label for="resetHotkey">
                            Reset Hotkey
                        </Label>
                        <HotkeyInput />

                    </Col>
                    <Col md={3}>
                        <Label for="changeOnStart">
                            Change On Start
                        </Label>
                        <FormGroup switch>
                            <Input id="changeOnStart"
                                name="changeOnStart"
                                type="switch" checked={changeOnStart.value}
                                onChange={changeOnStart.handleChange} />

                        </FormGroup>
                    </Col>
                </Row>
                {botMode.value === "Nick" ?
                    <>
                        <Row>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="userDiscordId">
                                        Your Discord ID - DPS FZR CONECTAR COM DISCORD PRA N PRECISAR DISTO
                                    </Label>
                                    <Input
                                        id="userDiscordId"
                                        name="userDiscordId"
                                        placeholder="paste your discord id here"
                                        type="password"
                                        onChange={discordId.handleChange}
                                    />
                                </FormGroup>
                            </Col>
                            <Col md={4}>
                                <Label for="changeOnAllServers" >
                                    Change On All Servers
                                </Label>
                                <FormGroup switch>
                                    <Input id="changeOnAllServers"
                                        name="changeOnAllServers"
                                        type="switch" checked={changeOnAllServers.value}
                                        onChange={changeOnAllServers.handleChange} />

                                </FormGroup>
                            </Col>
                        </Row>
                    </>
                    : // else
                    <>
                        <Row>
                            <FormGroup>
                                <Label for="userDiscordId">
                                    Server ID - DPS FZR CONECTAR COM DISCORD PRA FAZER UMA SELECT ANTES
                                </Label>
                                <Input
                                    id="userDiscordId"
                                    name="userDiscordId"
                                    placeholder="paste your discord id here"
                                    type="password"
                                    onChange={serverId.handleChange}
                                />
                            </FormGroup>
                        </Row>
                    </>}
                <Button type='button' color='success' >
                    Save
                </Button>
                <br /><br />
            </Form>

            <h3>Hotkeys</h3>
            <hr></hr>
            <Button type='button' color='success' onClick={modalAddHotkey.handleOpen}>Add</Button>
            <br /><br />
            <Row>
                {botMode.value ? (<HotkeysTable dataType={botMode.value} />) : (<>Select a mode</>)}
            </Row>



        </>
    )
}
