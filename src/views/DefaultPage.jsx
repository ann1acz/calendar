
import EventList from '../components/EventList';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Searchfield from '../components/Searchfield';
import { useState } from 'react';
import { useEffect } from 'react';
import calendarImage from '../assets/images/calendar-image.png';
import "../App.css";

const events = [
  {id: 1, title: "Meeting", date: "2026-04-22", description: "About party in Aarhus"},
  {id: 2, title: "Workshop", date: "2026-03-23", description: "Designing a new app"},
  {id: 3, title: "Party", date: "2026-02-18", description: "Designing a new app"},
  {id: 4 , title: "Social event", date: "2026-01-23", description: "Designing a new app"}
];

function DefaultPage() {

// Looks foe information in webpage if there is some,
// filterText is equal to this valie, otherwise it is an empty string.
  const [filterText, setFilterText] = useState(() => {
    const savedFilter = localStorage.getItem("filterText");
    return savedFilter ? savedFilter : "";
  });

  // Everytime the filter 
  useEffect(() => {
    localStorage.setItem("filterText", filterText)
  });

  const sortedEvents = events.toSorted((a,b) =>
    a.date.localeCompare(b.date, "en", {sensitivity: "base"})
  );

//Filter events based on the user input
const filteredEvents = sortedEvents.filter(event => 
  event.title.toLowerCase().includes(filterText.toLowerCase())
);

// Event handler function. 
// Change the value of variable "filtertext"
// makes the component re-render.
// function handleInputChange(event) { ...
const handleInputChange = (event) => {
  setFilterText(event.target.value);
}

  return (
    <div>
      
      <img src={calendarImage} alt="Calendar" className='calendar-image'/>
      <Searchfield handleinput={handleInputChange} filter={filterText} />
      <EventList events={filteredEvents} />
      
    </div>
  )
}

export default DefaultPage
