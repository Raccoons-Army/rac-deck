import React, { useEffect, useState } from 'react';

// components
import { Form, Row, Col, FormGroup, Label, Input, Button } from 'reactstrap';
import HotkeysTable from '@/components/tables/HotkeysTable';
import HotkeyInput from '@/components/others/HotkeyInput'

// custom hooks
import { useFormStringInput, useFormSwitchInput, useFormSelectBox } from '@/utility/customHooks'

export default function ChangeNameBot() {

    // main info
    const botToken = useFormStringInput("test")
    const changeOnStart = useFormSwitchInput(false);
    const botMode = useFormSelectBox(["Nick", "Channel"], "Nick")

    // nick info
    const discordId = useFormStringInput("")
    const changeOnAllServers = useFormSwitchInput(false);

    // channel info
    const serverId = useFormStringInput("")


    return (
        <>
            <h2>Main</h2>
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
                   <HotkeyInput/>

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

                <br />
                <br />
            </Form>

            <h2>Hotkeys</h2>
            <hr></hr>
            <Row>
                {botMode.value ? (<HotkeysTable dataType={botMode.value} />) : (<>Select a mode</>)}

            </Row>



        </>
    )
}