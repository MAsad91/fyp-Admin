import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import EventsTable from '../../components/table/EventsTable';
import styles from '../../user-components/ReportForm.module.css';
function Events() {
  const [message, setMessage] = useState("");
  const [EventData, setEventData] = useState([]);
  // const auth = useContext(AuthContext);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/events/`);
        console.log(0, data);
        setEventData(data);
      } catch (err) {
        const message = err.response.data.message;
        setMessage(message);
        console.log(message);
      }
    };
    fetchData();
  }, []);

  console.log(EventData);
  return (
    <div>
      <div className={styles.title}>
        <h1>Upcoming Events</h1>
      </div>
      <div className={styles.actions}>
        <Link
          to="/events/eventform"
          className={styles.button}
        >
          Add Event
        </Link>
      </div>
      <div>
        <EventsTable EventData={EventData} />
      </div>
    </div>
  );
}

export default Events;