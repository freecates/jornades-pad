'use client';
import { AddToCalendarButton } from 'add-to-calendar-button-react';

type Props = {
    name: string;
    place: string;
    date: string;
    calendars: ('Apple' | 'Google' | 'iCal' | 'Microsoft365' | 'MicrosoftTeams' | 'Outlook.com' | 'Yahoo')[];
    organizer: string;
    description: string;
    startTime: string;
    endTime: string;
};

const AddToCalendarButtonWrapper: React.FC<Props> = ({ name, place, date, calendars, organizer, description, startTime, endTime }) => {
    return (
        <div className='add-to-calendar-button-wrapper'>
            <AddToCalendarButton
                name={name}
                options={(calendars)}
                location={place}
                description={description}
                startDate={date}
                startTime={startTime}
                endTime={endTime}
                timeZone='UTC'
                buttonStyle='text'
                hideTextLabelButton
                buttonsList
                organizer={organizer}
                lightMode='system'
            ></AddToCalendarButton>
        </div>
    );
};

export default AddToCalendarButtonWrapper;
