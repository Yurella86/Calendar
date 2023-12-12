import React, { forwardRef, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Modal from 'react-modal';
import '../style/CalendarPage.scss';
import moment from 'moment';
import { CalendarContainer, FlexHrBtw, ModalWindowWrapper, WrapperCalendar, WrapperHdContainer } from "../style/Componnent/StyleComponent";
import DayItem from './DayItem';


const HomePage = () => {
    const [events, setEvents] = useState([]);
    const [isLightTheme, setIsLightTheme] = useState();
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

    const days = []
    const startMomentCalendar = moment(selectedDate).startOf('month').startOf('week');
    const endMomentCalendar = moment(selectedDate).endOf('month').endOf('week');
    const daysInMonth = endMomentCalendar.diff(startMomentCalendar, 'days') + 1;

    const changeTheme = () => {
        localStorage.setItem('light-theme', JSON.stringify(!isLightTheme))
        setIsLightTheme(!isLightTheme)
        console.log('changed => ' + isLightTheme);
    }

    //// Get Evens from localStor ////
    useEffect(() => {
        const theme = JSON.parse(localStorage.getItem('light-theme'))
        const storedEvents = JSON.parse(localStorage.getItem('events')) || [];
        if (theme === null) {
            setIsLightTheme(true);
        } else {
            setIsLightTheme(theme)
        }
        console.log('first => ' + theme);
        setEvents(storedEvents);
    }, []);
    //////////////////////////////

    //// Get Days from (selectedDate) for calendar place ////
    for (let i = 0; i < daysInMonth; i++) {
        const currentDay = moment(selectedDate).startOf('month').startOf('week').add(i, 'days').subtract(-1, 'day');
        const dayEvents = events.filter((event) => event.date === currentDay.format('YYYY-MM-DD'));

        days.push({
            fullDate: currentDay,
            events: dayEvents
        })
    }

    const calendarPlace = days.map(({ fullDate, events }, index) => (
        <DayItem
            key={index}
            fullDate={fullDate}
            events={events}
            handleUpdateEvent={(e) => handleUpdateEvent(e)}
            selectedDate={selectedDate}
        />
    )
    )
    //////////////////////////////


    //------------------------ Handle Events -------------------------
    //// Handle Change Month In Header ////
    const handlePrevMonth = () => {
        const prevMonth = moment(selectedDate).add(-1, 'months');
        setSelectedDate(prevMonth._d)
    }

    const handleNextMonth = () => {
        const nextMonth = moment(selectedDate).add(1, 'months');
        setSelectedDate(nextMonth._d)
    }

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };
    //////////////////////////////

    //// Handle Event by form ////
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
    }

    const handleFormChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

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

    const handleFormUpdate = (e) => {
        setUpdateData({ ...updateData, [e.target.name]: e.target.value });
    }

    const hendleDeleteEvent = () => {
        const localEvents = JSON.parse(localStorage.getItem('events'))
        const resultFiltered = localEvents.filter((e) => `${e.title}` !== updateEventsTitle);
        localStorage.setItem('events', JSON.stringify(resultFiltered));
        setIsModalEventOpen(false)
        setEvents(resultFiltered);
    }
    //////////////////////////////

    //// Handle Opening Modal  ////
    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeEventModal = () => {
        setIsModalEventOpen(false)
    }

    const closeModal = () => {
        setIsModalOpen(false);
        setIsModalEventOpen(false)
    };
    //////////////////////////////

    //// Custom Data Picker  ////
    const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
        <div className='flex-hr'>
            <strong onClick={handlePrevMonth} className='arrow left-arrow'>{`<`}</strong>
            <button className="example-custom-input" onClick={onClick} ref={ref}>
                {value}
            </button>
            <strong onClick={handleNextMonth} className='arrow right-arrow'>{`>`}</strong>
        </div>
    ));
    //////////////////////////////

    return (

        <WrapperCalendar className={`${isLightTheme ? 'light' : 'dark'}`}>
            <CalendarContainer>
                <header>
                    <WrapperHdContainer>
                        <FlexHrBtw>
                            <div className='left-hd'>
                                <h1>Calendar</h1>
                            </div>
                            <div className='right-hd'>
                                <div className='flex-hr'>
                                    <div className={`theme-btn ${isLightTheme ? 'light' : 'dark'}`} onClick={changeTheme}>
                                        <div className='flex-hr'>
                                            <div className='light'>
                                            </div>
                                            <div className="dark">
                                            </div>
                                        </div>
                                    </div>
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
                        </FlexHrBtw>
                    </WrapperHdContainer>
                </header>
                <main>
                    <WrapperCalendar>
                        <div className='grid-calendar'>
                            {calendarPlace}
                        </div>
                    </WrapperCalendar>

                </main>
                <Modal className='modal' isOpen={isModalOpen} onRequestClose={closeModal}>
                    <ModalWindowWrapper>
                        <form onSubmit={handleFormSubmit}>
                            <div className='modal-head'>
                                <h2>add new task</h2>
                            </div>
                            <div className='exit' onClick={closeModal}>
                            </div>
                            <div className='modal-content'>
                                <div className="title">
                                    <input
                                        placeholder='Title'
                                        id='text'
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleFormChange}
                                        required /></div>
                                <div className="description">
                                    <textarea
                                        placeholder='Description'
                                        rows="4"
                                        cols="22"
                                        name="description"
                                        value={formData.description}
                                        onChange={handleFormChange} />
                                </div>
                                <div className="date">
                                    <label>Date:</label>
                                    <DatePicker
                                        selected={selectedDate}
                                        onChange={handleDateChange}
                                        dateFormat="yyyy-MM-dd" />
                                </div>
                                <div className="time">
                                    <label>Time:</label>
                                    <input type="time" name="time" value={formData.time} onChange={handleFormChange} />
                                </div>
                                <div className="button-container">
                                    <button type="submit"><span>Save</span></button>
                                </div>
                            </div>
                        </form>
                    </ModalWindowWrapper>
                </Modal>

                <Modal className='modal' isOpen={isModalEventOpen} onRequestClose={closeEventModal}>
                    <ModalWindowWrapper>
                        <form onSubmit={handleUpdateAllEvents}>
                            <div className='modal-head'>
                                <h2>update task</h2>
                            </div>
                            <div className='exit' onClick={closeModal}>
                            </div>
                            <div className='modal-content'>
                                <div className="title">
                                    <input
                                        placeholder='Title'
                                        id='text'
                                        type="text"
                                        name="title"
                                        value={updateData.title}
                                        onChange={handleFormUpdate}
                                        required /></div>
                                <div className="description">
                                    <textarea
                                        placeholder='Description'
                                        rows="4" cols="22"
                                        name="description"
                                        value={updateData.description}
                                        onChange={handleFormUpdate}
                                        required />
                                </div>
                                <div className="date">
                                    <label>Date:</label>
                                    <DatePicker value={updateData.date} selected={selectedDate} onChange={handleDateChange} dateFormat="yyyy-MM-dd" />
                                </div>
                                <div className="time">
                                    <label>Time:</label>
                                    <input type="time" name="time" value={updateData.time} onChange={handleFormUpdate} />
                                </div>
                                <div className="button-container">
                                    <button onClick={hendleDeleteEvent} className='delete'><span>Delete</span></button>
                                    <button type="submit"><span>Update</span></button>
                                </div>
                            </div>
                        </form>
                    </ModalWindowWrapper>
                </Modal>
            </CalendarContainer>
        </WrapperCalendar>
    );
};

export default HomePage;