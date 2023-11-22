import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import '../style/CalendarPage.scss';
import moment from 'moment';
import DatePicker from 'react-datepicker';


const titleOfDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

const HomePage = () => {

    moment.updateLocale('ua', { week: { dow: 1 } })
    const [events, setEvents] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        date: '',
        time: '',
    });

    var currMonthName = moment().format('MM');
    console.log('currMonthName' + currMonthName);

    const startMomentCalendar = moment().startOf('month').startOf('week');
    const endMomentCalendar = moment().endOf('month').endOf('week');
    const daysInMonth = endMomentCalendar.diff(startMomentCalendar, 'days') + 1;

    const days = []

    useEffect(() => {
        const storedEvents = JSON.parse(localStorage.getItem('events')) || [];
        setEvents(storedEvents);
    }, []);

    for (let i = 0; i < daysInMonth; i++) {
        const currentDay = moment().startOf('month').startOf('week').add(i, 'days');
        const dayEvents = events.filter((event) => event.date === currentDay.format('YYYY-MM-DD'));

        days.push({
            dayNumber: currentDay.format('D'),
            dayOfWeek: currentDay.format('d'),
            monthOfDay: currentDay.format('M'),
            events: dayEvents
        })
    }

    const calendarPlace = days.map(({ dayNumber, dayOfWeek, monthOfDay, events }) =>
        <div className={`wrapper-day ${dayOfWeek === "6" || dayOfWeek === "0" ? 'weekend' : ''}${monthOfDay !== moment().format('M') ? ' out-of-month' : ''}`}>
            {dayNumber}
            <div className='events-items'>
                {events.map(evet => <div className='event'>{evet.title}</div>)}
            </div>
        </div>
    )

    const renderTitles = titleOfDays.map(title => <div className='title'>{title}</div>)

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

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const handleDayClick = (day) => {
        console.log('Selected day:', day.format('YYYY-MM-DD'));
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setFormData({
            title: '',
            description: '',
            date: '',
            time: '',
        });
    };

    return (
        <div className='wrapper-calendar'>
            <header>
                <div className='wrapper-hd-container'>
                    <div className='flex-hr'>
                        <div className='left-hd'>
                            <h1>{moment().format('MMMM')}</h1>
                        </div>
                        <div className='center-hd'>
                            <span>{moment().format('YYYY')}</span>
                        </div>
                        <div className='right-hd'>
                            <div className='flex-hr'>
                                <button onClick={openModal}>button</button>
                                <div>data</div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <main>
                <div className='wrapper-grid'>
                    {renderTitles}
                    {calendarPlace}
                </div>

            </main>
            <Modal className='modal' isOpen={isModalOpen} onRequestClose={closeModal}>
                <form onSubmit={handleFormSubmit}>
                    <div className='modal-head'>
                        <h2>add new task</h2>
                    </div>
                    <div className='modal-content'>
                        <div className="title">
                            <label>Title:</label>
                            <input type="text" name="title" value={formData.title} onChange={handleFormChange} required /></div>
                        <div className="description">
                            <label>Description:</label>
                            <textarea name="description" value={formData.description} onChange={handleFormChange} required />
                        </div>
                        <div className="date">
                            <label>Date:</label>
                            <DatePicker selected={selectedDate} onChange={handleDateChange} dateFormat="yyyy-MM-dd" />
                        </div>
                        <div className="time">
                            <label>Time:</label>
                            <input type="time" name="time" value={formData.time} onChange={handleFormChange} required />
                        </div>
                        <div className="button-container">
                            <button type="submit">Save</button>
                        </div>

                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default HomePage;