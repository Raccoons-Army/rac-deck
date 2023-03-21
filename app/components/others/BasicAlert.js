

import { useEffect, useState } from 'react';
import { Alert } from 'reactstrap';

export default function BasicAlert({ alert }) {
    const [visible, setVisible] = useState(true);
    const onDismiss = () => {
        alert.dismissAlert();
        setVisible(false)
    };


    // set timer to close alert
    useEffect(() => {
        if (alert.props.timer) {
            setTimeout(() => {
                onDismiss()
            }, alert.props.timer);
        }

    })

    return (
        <Alert color={alert.props.color} isOpen={visible} fade={true} onClick={onDismiss}>
            {alert.props.msg}
        </Alert>
    )
}