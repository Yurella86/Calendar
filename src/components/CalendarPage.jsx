import React, { forwardRef, useEffect, useState } from 'react';
import Modal from 'react-modal';
import '../style/CalendarPage.scss';
import moment from 'moment';
import DatePicker from 'react-datepicker';


// const titleOfDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

const HomePage = () => {

    moment.updateLocale('es', { week: { dow: 1 } })
    const [events, setEvents] = useState([]);
    const [updateEventsTitle, setUpdateEventsTitle] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalEventOpen, setIsModalEventOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        date: '',
        time: '',
    });
    const [updateData, setUpdateData] = useState({
        title: '',
        description: '',
        date: '',
        time: '',
    });

    useEffect(() => {
        const storedEvents = JSON.parse(localStorage.getItem('events')) || [];
        setEvents(storedEvents);
    }, []);

    // useEffect(() => {
    //     const storedEvents = JSON.parse(localStorage.getItem('events')) || [];
    //     setEvents(storedEvents);
    // }, [events]);

    // console.log(moment(selectedDate).startOf('month').startOf('week'));
    // console.log('selectedDate => ' + selectedDate.getMonth());

    const startMomentCalendar = moment(selectedDate).startOf('month').startOf('week');
    const endMomentCalendar = moment(selectedDate).endOf('month').endOf('week');
    const daysInMonth = endMomentCalendar.diff(startMomentCalendar, 'days') + 1;

    // console.log('startMomentCalendar => ' + startMomentCalendar.format());
    // console.log('endMomentCalendar => ' + endMomentCalendar.format());
    // console.log('daysInMonth =>' + daysInMonth);

    const days = []

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    for (let i = 0; i < daysInMonth; i++) {
        const currentDay = moment(selectedDate).startOf('month').startOf('week').add(i, 'days');
        const dayEvents = events.filter((event) => event.date === currentDay.format('YYYY-MM-DD'));

        days.push({
            fullDate: currentDay,
            events: dayEvents
        })
    }

    // ---------- START UPDATE EVENT CARD -----------
    const handleUpdateEvent = (e) => {
        const titleEvent = e.target.textContent
        setUpdateEventsTitle(titleEvent)

        setIsModalEventOpen(true)

        const localEvents = JSON.parse(localStorage.getItem('events')) || [];
        const resultFiltered = localEvents.filter((e) => `${e.title}` === titleEvent);

        setUpdateData({
            title: resultFiltered[0].title,
            description: resultFiltered[0].description,
            date: resultFiltered[0].date,
            time: resultFiltered[0].time,
        });
        console.log("updateData =>" + updateData.date);
    }

    const handleFormUpdate = (e) => {
        setUpdateData({ ...updateData, [e.target.name]: e.target.value });
    }

    const handleUpdateAllEvents = (e) => {
        e.preventDefault();

        const updated = {
            title: updateData.title,
            description: updateData.description,
            date: updateData.date,
            time: updateData.time,
            created: 'f',
        };

        const localEvents = JSON.parse(localStorage.getItem('events')) || [];
        const resultFiltered = localEvents.filter((e) => `${e.title}` !== updateEventsTitle);

        const updatedEvents = [...resultFiltered, updated];
        localStorage.setItem('events', JSON.stringify(updatedEvents));
        setIsModalEventOpen(false)
        setEvents(updatedEvents);
    }

    const hendleDeleteEvent = () => {
        console.log(updateEventsTitle);

        const localEvents = JSON.parse(localStorage.getItem('events'))
        const resultFiltered = localEvents.filter((e) => `${e.title}` !== updateEventsTitle);
        localStorage.setItem('events', JSON.stringify(resultFiltered));
        setIsModalEventOpen(false)
        setEvents(resultFiltered);

        console.log(resultFiltered);

    }
    // ---------- END UPDATE EVENT CARD -----------

    const calendarPlace = days.map(({ fullDate, events }, index) =>
        <div key={index} className={`wrapper-day ${fullDate.format('d') === "6" || fullDate.format('d') === "0" ? 'weekend' : ''}${fullDate.format('M') !== moment(selectedDate).format('M') ? ' out-of-month' : ''}${fullDate.format('YYYY-MM-DD') === moment().format('YYYY-MM-DD') ? 'current' : ''}`}>
            <div className={`number`}>
                <div className='flex-hr'>
                    <span>{fullDate.format('D')}</span>
                    <span>{fullDate.format('ddd')}</span>
                </div>
            </div>
            <div className='events-items'>
                {events.map((event, index) => <div key={index} className='event' onClick={handleUpdateEvent}>{event.title}</div>)}
            </div>
        </div >
    )

    // const renderTitles = titleOfDays.map(title => <div className='title'>{title}</div>)

    const handleFormSubmit = (e) => {
        e.preventDefault();

        const newEvent = {
            title: formData.title,
            description: formData.description,
            date: moment(selectedDate).format('YYYY-MM-DD'),
            time: formData.time,
            created: moment().format('YYYY-MM-DD HH:mm:ss'),
        };

        const updatedEvents = [...events, newEvent];
        setEvents(updatedEvents);
        localStorage.setItem('events', JSON.stringify(updatedEvents));

        setFormData({
            title: '',
            description: '',
            date: '',
            time: '',
        });
        setIsModalOpen(false);

        console.log(formData);
    }

    const handleFormChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        console.log(formData);
    }

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeEventModal = () => {
        setIsModalEventOpen(false)
    }

    // const handleDayClick = (day) => {
    //     console.log('Selected day:', day.format('YYYY-MM-DD'));
    // };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handlePrevMonth = () => {
        debugger
        const prevMonth = moment(selectedDate).add(-1, 'months');
        setSelectedDate(prevMonth._d)
    }

    const handleNextMonth = () => {
        const nextMonth = moment(selectedDate).add(1, 'months');
        setSelectedDate(nextMonth._d)
    }

    //---------------custom data picker----------------
    const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
        <div className='flex-hr'>
            <strong onClick={handlePrevMonth} className='arrow left-arrow'>{`<`}</strong>
            <button className="example-custom-input" onClick={onClick} ref={ref}>
                {value}
            </button>
            <strong onClick={handleNextMonth} className='arrow right-arrow'>{`>`}</strong>
        </div>
    ));
    //--------------- end custom data picker----------------

    return (
        <div className='wrapper-calendar'>
            <header>
                <div className='wrapper-hd-container'>
                    <div className='flex-hr'>
                        <div className='left-hd'>
                            <h1>Calendar</h1>
                        </div>
                        <div className='center-hd'>
                            {/* <span>{moment().format('YYYY')}</span> */}
                        </div>
                        <div className='right-hd'>
                            <div className='flex-hr'>
                                <button className='add-event' onClick={openModal}><span>add task</span></button>
                                <div>
                                    <DatePicker
                                        showMonthYearPicker
                                        selected={selectedDate}
                                        onChange={handleDateChange}
                                        dateFormat="MMMM yyyy"
                                        customInput={<ExampleCustomInput />}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <main>
                <div className='wrapper-calendar'>
                    <div className='grid-calendar'>
                        {calendarPlace}
                    </div>
                </div>

            </main>
            <Modal className='modal' isOpen={isModalOpen} onRequestClose={closeModal}>
                <form onSubmit={handleFormSubmit}>
                    <div className='modal-head'>
                        <h2>add new task</h2>
                    </div>
                    <div className='modal-content'>
                        <div className="title">
                            <input placeholder='Title' id='text' type="text" name="title" value={formData.title} onChange={handleFormChange} required /></div>
                        <div className="description">
                            <textarea placeholder='Description' rows="4" cols="22" name="description" value={formData.description} onChange={handleFormChange} />
                        </div>
                        <div className="date">
                            <label>Date:</label>
                            <DatePicker selected={selectedDate} onChange={handleDateChange} dateFormat="yyyy-MM-dd" />
                        </div>
                        <div className="time">
                            <label>Time:</label>
                            <input type="time" name="time" value={formData.time} onChange={handleFormChange} />
                        </div>
                        <div className="button-container">
                            <button onClick={closeModal}><span>Cancel</span></button>
                            <button type="submit"><span>Save</span></button>

                        </div>

                    </div>
                </form>
            </Modal>

            <Modal className='modal' isOpen={isModalEventOpen} onRequestClose={closeEventModal}>
                <form onSubmit={handleUpdateAllEvents}>
                    <div className='modal-head'>
                        <h2>update task</h2>
                    </div>
                    <div className='modal-content'>
                        <div className="title">
                            <input placeholder='Title' id='text' type="text" name="title" value={updateData.title} onChange={handleFormUpdate} required /></div>
                        <div className="description">
                            <textarea placeholder='Description' rows="4" cols="22" name="description" value={updateData.description} onChange={handleFormUpdate} required />
                        </div>
                        <div className="date">
                            <label>Date:</label>
                            <DatePicker value={updateData.date} selected={selectedDate} onChange={handleDateChange} dateFormat="yyyy-MM-dd" />
                        </div>
                        <div className="time">
                            <label>Time:</label>
                            <input type="time" name="time" value={updateData.time} onChange={handleFormUpdate} required />
                        </div>
                        <div className="button-container">
                            <button onClick={hendleDeleteEvent} className='delete'><span>Delete</span></button>
                            <button type="submit"><span>Update</span></button>
                        </div>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default HomePage;