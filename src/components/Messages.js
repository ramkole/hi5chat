import React from 'react'
import { formatRelative } from 'date-fns'

const Messages = ({
    text = '',
    createdAt = null,
    uid = '',
    displayName = '',
    photoURL = ''
}) => {


    return (
        <div  style={{margin: '10px', backgroundColor: '#a1d7f5', borderRadius: '10px', padding : '5px'}}>
            

        <div style={{display: 'flex',alignItems: 'center', margin: '4px'}}>
            {photoURL ? <img src={photoURL} style={{borderRadius: '25px',marginRight: '20px'}} alt='profile' height={45} width={45} /> : null}
            <div style={{display: 'flex', alignItems: 'baseline', width: '100%', justifyContent: 'space-between' }}>
            {displayName ? <p style={{paddingLeft: '10px', marginBottom: '-3px', fontSize:'18px', fontWeight: 'bold'}} >{displayName}</p> : null }
            <p style={{paddingRight: '10px', fontSize: '15px', fontWeight: '600'}}>{text}</p>
            {createdAt?.seconds ? 
            <span style={{fontSize: '12px'}}>
                {formatRelative(new Date(createdAt.seconds * 1000), new Date())}
            </span> : null}
            
            </div>

        </div>
        </div> 
    )
}

export default Messages
