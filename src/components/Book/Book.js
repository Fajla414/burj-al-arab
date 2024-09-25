// import React, { useContext, useState } from 'react';
// import { Link, useParams } from 'react-router-dom';
// import { UserContext } from '../../App';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';

// const Book = () => {
//     const { bedType } = useParams();
//     const [loggedInUser, setLoggedInUser] = useContext(UserContext);
//     const [selectedDate, selectedDateTime] = useState({
//         checkIn: new Date(),
//         checkOut: new Date(),

//     })

//     return (
//         <div style={{ textAlign: 'center' }}>
//             <h1>Hello, {loggedInUser.name} Let's book a {bedType} Room.</h1>
//             <p>Want a <Link to="/home">different room?</Link> </p>

//             <LocalizationProvider dateAdapter={AdapterDayjs} >
//                 <DatePicker defaultValue={selectedDate.checkIn}/>
//             </LocalizationProvider>

//             <LocalizationProvider dateAdapter={AdapterDayjs} >
//                 <DatePicker />
//             </LocalizationProvider>
//         </div>
//     );
// };

// export default Book;
import React, { useContext, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { UserContext } from '../../App';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { Button } from '@mui/material';
import { ArrowRight } from '@mui/icons-material';
import Bookings from '../Bookings/Bookings';

const Book = () => {
    const { bedType } = useParams();
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    const [selectedDate, setSelectedDate] = useState({
        checkIn: dayjs(), // Use dayjs to set default date
        checkOut: dayjs(),
    });

    const handleCheckInDate = (date) => {
        let newDates = { ...selectedDate };
        newDates.checkIn = date;
        setSelectedDate(newDates);
    }

    const handleCheckOutDate = (date) => {
        let newDates = { ...selectedDate };
        newDates.checkOut = date;
        setSelectedDate(newDates);
    }

    const handleBooking = () => {
        const newBooking = { ...loggedInUser, ...selectedDate };
        fetch(`http://localhost:5000/addBooking`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newBooking),
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
            })
    }

    return (
        <div style={{ textAlign: 'center' }}>
            <h1>Hello, {loggedInUser.name}, Let's book a {bedType} Room.</h1>
            <p>Want a <Link to="/home">different room?</Link> </p>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker value={selectedDate.checkIn} label="Check In Date" onChange={handleCheckInDate} />
            </LocalizationProvider>


            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker value={selectedDate.checkOut} label="Check Out Date" onChange={handleCheckOutDate} />
            </LocalizationProvider>
            <br /><br />
            <Button onClick={handleBooking} variant='contained' color='primary' startIcon={<ArrowRight />}>Book Now</Button>

            <Bookings></Bookings>
        </div>
    );
};

export default Book;
