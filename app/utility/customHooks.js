import { useState } from "react";

// hook for modals
export function useModal(initialValue) {
    const [show, setShow] = useState(initialValue);

    function handleOpen() {
        setShow(!show);
    }

    function handleClose() {

        setShow(!show);
    }

    return {
        show,
        handleOpen,
        handleClose,
    };

}

//hook for string inputs
export function useFormStringInput(initialValue) {
    const [value, setValue] = useState(initialValue);

    function handleChange(e) {
        setValue(e.target.value);
    }

    function handleLoad(e) {
        setValue(e);
    }

    function handleReset() {
        setValue("");
    }

    return {
        value,
        handleLoad,
        handleChange,
        handleReset,
    };
}

// hook for number inputs
export function useFormNumberInput(initialValue, hasMin, hasMax, min, max) {
    const [value, setvalue] = useState(!initialValue ? 0 : initialValue);

    // confirm if value is on the given range
    function inRange(value) {
        let newVal = value;

        // check min
        if (hasMin) {
            newVal = value >= min ? value : min
        }

        // check max
        if (hasMax) {
            newVal = newVal <= max ? newVal : max
        }

        return newVal
    }

    // on change
    function handleChange(e) {
        setvalue(inRange(e.target.value));
    }

    // load value
    function handleLoad(value) {
        setvalue(inRange(value));
    }

    // reset value
    function handleReset() {
        setvalue(hasMin ? min : 0);
    }

    return {
        value,
        handleChange,
        handleLoad,
        handleReset,
    };
}

// hook for switch inputs
export function useFormSwitchInput(initialValue) {
    const [value, setValue] = useState(initialValue);

    function handleChange(e) {
        setValue(!value);
    }

    function handleLoad(e) {
        setValue(e);
    }

    function handleReset() {
        setValue(false);
    }

    return {
        value,
        handleLoad,
        handleChange,
        handleReset,
    };
}


// hook for select boxes
export function useFormSelectBox(options, initialValue) {

    const [value, setValue] = useState(initialValue);

    function handleChange(e) {
        setValue(e.target.value);
    }

    function handleLoad(e) {
        setValue(e);
    }


    return {
        value,
        options,
        handleLoad,
        handleChange,
    };
}

// hook for my reactstrap alerts
export function useAlert() {

    const [props, setProps] = useState({ visible: false, color: '', msg: '', timer: 0 });

    // sets alert props
    function showAlert(color, msg, timer) {
        props.visible = true
        props.color = color
        props.msg = msg
        props.timer = timer
        setProps(props);
    }

    function dismissAlert() {
        console.log("closed");
        props.visible = false;
        setProps(props)
    }

    return {
        props,
        showAlert,
        dismissAlert
    };
}
