import React from 'react';
import { Link } from 'react-router-dom';
//import { useHistory } from 'react-router-dom';

//Redux imports
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withFirestore, useFirestoreConnect } from 'react-redux-firebase';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Spinner from '../layout/Spinner';

const EventDetails = (props) => {
  const id = props.match.params.id;
  //const firestore = useFirestore();
  //const history = useHistory();

  //The database listener is listening to the clients collection / document with the id we passed in.
  useFirestoreConnect(
    (props) => [{ collection: 'events', doc: id }],
    connect((state, props) => ({
      events: state.firestore.data.events,
    }))
  );

  const { events } = props;

  if (!events) {
    return <Spinner />;
  } else {
    //Get the current event - it will be the first element in the array
    const event = events[0];
    return (
      <div className="details d-flex justify-content-center">
        <div className="card">
          <div className="row d-flex justify-content-end">
            <div className="btn btn-info px-3">
              <Link to={`/event/edit/${event.id}`} className="btn text-light">
                <FontAwesomeIcon icon="edit" size="lg" />
                Edit
              </Link>
            </div>
          </div>
          <div className="row">
            <div className="col text-center">
              <h1>{event.title}</h1>
            </div>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col text-center">
                <FontAwesomeIcon icon="map-marker-alt" size="lg" />
                <span> {event.location}</span>
              </div>
            </div>

            <div className="row">
              <div className="col text-center">
                <FontAwesomeIcon icon="calendar-alt" />
                <span> {event.date}</span>
              </div>
            </div>
            <div className="row mt-5">
              <div className="col-6">
                <Link
                  to={`/event/food/${event.id}`}
                  className="btn btn-success text-light"
                >
                  Food
                </Link>
              </div>

              <div className="col-6">
                <label>
                  <h3>Drink</h3>
                </label>
                <p>Drink1</p>
                <p>Drink1</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

const enhance = compose(
  withFirestore,
  connect((state) => ({
    events: state.firestore.ordered.events,
  }))
);

export default enhance(EventDetails);
