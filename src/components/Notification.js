import { Alert } from '@mui/material'

const Notification = ({ message, messageType }) => {
    if (message === null) {
        return null
    }

    return (
        <div>
            <Alert severity={messageType} >{message}</Alert>
        </div>
    )
}

export default Notification
