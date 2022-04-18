import * as React from 'react';
import { useState, useMemo } from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

const Error = ({message, count}) => {
    const [visible, setVisible] = useState(false)
    message = message.slice(3, -4)
    
    useMemo(() => {
        if (!message) {
            setVisible(false)
            return
        }

        setVisible(true)
        
        const timer = setTimeout(() => {
            setVisible(false)
        }, 5000)

        return () => clearTimeout(timer)
    }, [message, count])

    if (!visible) {
        return
    }

    return(
        <div className="Error">
            <Alert 
            severity="error" 
            sx={{position:'absolute', zIndex:5, width:'30%', top:'100px', marginLeft:'50px'}}>
            <AlertTitle sx={{position:'relative', right:'25px'}}>Error</AlertTitle>
            {message}
            </Alert>
        </div>
    )
}

export default Error;