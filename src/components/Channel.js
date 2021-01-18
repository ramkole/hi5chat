import React, {useState, useEffect} from 'react'
import firebase from 'firebase/app'
import Messages from './Messages'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';
import Paper from '@material-ui/core/Paper';

const Channel = ({user = null, db = null}) => {
    const [messages, setMessages] = useState([])
    const [newMessages, setNewMessages] = useState('')
    const chatContainer = React.createRef();

    const {uid, displayName, photoURL} = user
    useEffect(() => {

        if(db){
            const unsubscribe = db
            .collection('messages')
            .orderBy('createdAt')
            .limit(100)
            .onSnapshot(querySnapshot => {

                const data = querySnapshot.docs.map(doc => ({
                    ...doc.data(),
                    id : doc.id
                }))
                setMessages(data)
            })
            return unsubscribe
        }
    }, [db])

    const handleOnChange = e => {
        setNewMessages(e.target.value)
    }

    const scrollToMyRef = () => {
        const scroll =
          chatContainer.current.scrollHeight -
          chatContainer.current.clientHeight;
        chatContainer.current.scrollTo(0, scroll)
      };
    const handleOnSubmit = e => {
        e.preventDefault()
        if(db) {
            db.collection('messages').add({
                text: newMessages,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                uid,
                displayName,
                photoURL
            })
        }
        scrollToMyRef();
    }
    return (
        <ul style={{ marginRight: '45px'}}>
            <Paper elevation={3} ref={chatContainer} style={{height: '400px', paddingBottom: '75px' , width: '100%', overflow: 'auto'}}>
            {messages.map(message => (<li key={message.id}><Messages {...message} /></li>))}
            </Paper>
            <form onSubmit={handleOnSubmit} style={{width: '100%', display: 'flex', marginTop: '15px'}}>
            <TextField
            id="outlined-secondary"
            variant="outlined"
            color="secondary"
          label="Type here to chat"
          multiline
          fullWidth
          rowsMax={4}
          value={newMessages}
          onChange={handleOnChange}
          style={{marginLeft: '9px'}}
        />    
        <Button
        variant="contained"
        color="primary"
        endIcon={<SendIcon />}
        style={{height: '55px', marginRight: '45px', marginLeft: '5px'}}
        type='submit' disabled={!newMessages}
      >Send</Button>

            </form>
        </ul>
    )
}

export default Channel
