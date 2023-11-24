import React from 'react';
import '../style/Event.scss'

const Event = ({ event, handleUpdateEvent }) => {


    return (
        <div className='event' onClick={handleUpdateEvent}>
            {event.title}
        </div>
    );
};

export default Event;