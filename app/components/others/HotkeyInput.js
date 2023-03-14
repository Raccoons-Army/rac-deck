import React, { useRef, useState } from 'react';

// components
import { Input, InputGroup, Button } from 'reactstrap';

export default function HotkeyInput() {


    const [inputRef, setInputFocus] = useFocus()
    const [hotkey, setHotkey] = useState("")
    const [isRecording, setIsRecording] = useState(false)

    // record hotkeys handle
    const recordHotKeyHandle = (e) => {

        e.preventDefault();

        if (isRecording) {
            // prevents shortcuts

            setHotkey(hotkey ? hotkey + "+" + e.key : e.key)
        }

    }

    // handle to start recording the hotkey
    const startRecording = () => {
        // is recording
        setIsRecording(!isRecording);
        // reset hotkey input
        setHotkey("");
        // focus input
        setInputFocus()
    }

    // handle to stop recording the hotkey
    const stopRecording = () => {
        setIsRecording(!isRecording)

        // saves the hotkey in the db or in file (TBD) the 
    }


    return (
        <>
            <InputGroup>
                <Input
                    type="text"
                    autoFocus
                    innerRef={inputRef}
                    onKeyDown={recordHotKeyHandle}
                    defaultValue={hotkey}
                />
                {isRecording ?
                    <Button color='danger' type='button' onClick={stopRecording}>
                        Stop
                    </Button>
                    : // else
                    <Button color='info' type='button' onClick={startRecording}>
                        Record
                    </Button>
                }


            </InputGroup>

        </>
    )
}

const useFocus = () => {
    const htmlElRef = useRef(null)
    const setFocus = () => { htmlElRef.current && htmlElRef.current.focus() }

    return [htmlElRef, setFocus]
}