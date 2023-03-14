import { useState } from "react";

//hook para abrir e fechar modals
export function useModal(initialValue) {
    const [show, setShow] = useState(initialValue);

    function handleOpen() {
        // console.log("opening - " + !show);
        setShow(!show);
    }

    function handleClose() {
        // console.log("closing - "+ !show);

        setShow(!show);
    }

    return {
        show,
        handleOpen,
        handleClose,
    };

}

//hook para as inputs de forms
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

//hook para a input de numeros
export function useFormNumberInput(initialValue) {
    const [value, setvalue] = useState(!initialValue ? false : initialValue);

    //handler para onChange da input
    function handleChange(e) {
        setvalue(e.target.value);
    }

    //func pra dar load das de um valor
    function handleLoad(valor) {
        setvalue(valor);
    }

    //func para resetar o valor
    function handleReset() {
        setvalue(false);
    }

    return {
        value,
        handleOnChange,
        handleLoad,
        handleReset,
    };
}

//hook para as inputs de forms
export function useFormSwitchInput(initialValue) {
    const [value, setValue] = useState(initialValue);

    function handleChange(e) {
        setValue(!value);
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


// select box
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
