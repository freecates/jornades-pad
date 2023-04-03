'use client';
import { AddToCalendarButton } from 'add-to-calendar-button-react';

type Props = {
    name: string;
    place: string;
    date: string;
    calendars: string[];
    organizer: string;
};

const AddToCalendarButtonWrapper: React.FC<Props> = ({ name, place, date, calendars, organizer }) => {
    return (
        <div className='add-to-calendar-button-wrapper'>
            <AddToCalendarButton
                name={name}
                options={calendars}
                location={place}
                startDate={date}
                startTime='00:00'
                timeZone='Europe/Paris'
                buttonStyle='text'
                hideTextLabelButton
                buttonsList
                organizer={organizer}
            ></AddToCalendarButton>
        </div>
    );
};

export default AddToCalendarButtonWrapper;
