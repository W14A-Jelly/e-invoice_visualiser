import * as React from 'react';
import { useState, useMemo } from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

const Error = ({message, count}) => {
    const [visible, setVisible] = useState(false)
    
    useMemo(() => {
        if (!message) {
            setVisible(false)
            return
        }

        setVisible(true)
        

        return
    }, [message, count])

    if (!visible) {
        return
    }

    return(
        <div className="Error">
            <Alert 
            severity="info" 
            sx={{position:'absolute', zIndex:5, width:'35%', top:'100px', marginLeft:'50px'}}>
            <AlertTitle sx={{position:'relative', right:'160px'}}>Info</AlertTitle>
            {message}
            </Alert>
        </div>
    )
}

export default Error;