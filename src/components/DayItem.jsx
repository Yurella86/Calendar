import React from 'react';
import { EventsStyleItems } from '../style/Componnent/StyleComponent';
import moment from 'moment';
import Event from './Event';

const DayItem = ({ fullDate, events, handleUpdateEvent, selectedDate }) => {
    return (
        <div className={`wrapper-day ${fullDate.format('d') === "6" || fullDate.format('d') === "0" ? 'weekend' : ''}${fullDate.format('M') !== moment(selectedDate).format('M') ? ' out-of-month' : ''}${fullDate.format('YYYY-MM-DD') === moment().format('YYYY-MM-DD') ? 'current' : ''}`}>
            <div className={`number`}>
                <div className='flex-hr'>
                    <span>{fullDate.format('D')}</span>
                    <span>{fullDate.format('ddd')}</span>
                </div>
            </div>
            <EventsStyleItems>
                {events.map((event, index) => (
                    <Event
                        key={index}
                        event={event}
                        handleUpdateEvent={(e) => handleUpdateEvent(e)}
                    />
                ))}
            </EventsStyleItems>
        </div >
    );
};

export default DayItem;