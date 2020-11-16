import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

//Redux imports
import { compose } from 'redux';
import {
  withFirestore,
  useFirestoreConnect,
  useFirestore,
} from 'react-redux-firebase';

const AddEvents = (props, { events }) => {
  const [eventDetails, setEventDetails] = useState({
    title: '',
    location: '',
    date: '',
  });

  const { title, location, date } = eventDetails;

  //add in database config and listeners
  const firestore = useFirestore();
  useFirestoreConnect('events');
  const history = useHistory();

  const onChange = (e) => {
    setEventDetails({
      ...eventDetails,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(eventDetails);
    const newEvent = eventDetails;

    //add the new event to the database
    firestore
      .collection('events')
      .add(newEvent)
      .then(() => console.log('Event added'));
    //redirect user to the dashboard
    history.push('/');
  };

  return (
    <div className="add-event d-flex justify-content-center">
      <div className="card">
        <Link to="/" className="btn-back pt-3 pl-3">
          <FontAwesomeIcon icon="chevron-left" />
          Back to Dashboard
        </Link>
        <div className="card-body add-box">
          <h1 className="card-title title mt-3 mb-4">Add new event</h1>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="form-group row mb-4">
              <label className="col-sm-3 col-form-label label">Title</label>
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
            <div className="form-group row mb-4">
              <label className="col-sm-3 col-form-label label">Location</label>
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
              <label className="col-sm-3 col-form-label label">Date</label>
              <div className="col-sm-9">
                <input
                  type="date"
                  className="form-control"
                  name="date"
                  minLength="2"
                  value={date}
                  onChange={(e) => onChange(e)}
                />
              </div>
            </div>
            <button type="submit" className="btn btn-add w-100 mt-3">
              Add
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const enhance = compose(withFirestore);

export default enhance(AddEvents);
