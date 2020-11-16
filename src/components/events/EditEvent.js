import React, { useState, useEffect } from 'react';

//Redux imports
import { compose } from 'redux';
import { connect } from 'react-redux';
import {
  withFirestore,
  useFirestoreConnect,
  useFirestore,
} from 'react-redux-firebase';
import { useHistory } from 'react-router-dom';

const EditEvent = (props) => {
  const [eventDetails, setEventDetails] = useState({
    title: '',
    location: '',
    date: '',
  });

  //Set up variables
  const { title, location, date } = eventDetails;
  const id = props.match.params.id;
  const firestore = useFirestore();
  const history = useHistory();

  useFirestoreConnect(
    (props) => [{ collection: 'events', doc: id }],
    connect((state, props) => ({
      events: state.firestore.data.events,
    }))
  );

  const { events } = props;

  useEffect(() => {
    if (events) {
      const event = events[0];

      setEventDetails({
        title: event.title,
        location: event.location,
        date: event.date,
      });
    }
  }, [events]);

  const onSubmit = (e) => {
    e.preventDefault();
    console.log('Submit - edit event');

    // update our client in the database.
    firestore
      .collection('events')
      .doc(id)
      .update(eventDetails)
      .then(() => console.log('Event updated'));

    history.push('/');
  };

  const onChange = (e) =>
    setEventDetails({
      ...eventDetails,
      [e.target.name]: e.target.value,
    });

  return (
    <div className="add-event d-flex justify-content-center">
      <div className="card">
        <div className="card-body add-box">
          <h2 className="card-title text-center mb-4">Edit event</h2>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="form-group row">
              <label className="col-sm-3 col-form-label">Title</label>
              <div className="col-sm-9">
                <input
                  type="text"
                  className="form-control"
                  name="title"
                  minLength="2"
                  value={title}
                  onChange={(e) => onChange(e)}
                />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-3 col-form-label">Location</label>
              <div className="col-sm-9">
                <input
                  type="text"
                  className="form-control"
                  name="location"
                  minLength="2"
                  value={location}
                  onChange={(e) => onChange(e)}
                />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-3 col-form-label">Date</label>
              <div className="col-sm-9">
                <input
                  type="text"
                  className="form-control"
                  name="date"
                  minLength="2"
                  value={date}
                  onChange={(e) => onChange(e)}
                />
              </div>
            </div>
            <button type="submit" className="btn btn-add w-100 mt-3">
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const enhance = compose(
  withFirestore,
  connect((state) => ({
    events: state.firestore.ordered.events,
  }))
);

export default enhance(EditEvent);
