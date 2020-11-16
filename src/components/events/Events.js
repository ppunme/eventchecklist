import React from 'react';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import { Link, useHistory } from 'react-router-dom';

//Redux imports
import { compose } from 'redux';
import {
  withFirestore,
  useFirestoreConnect,
  useFirestore,
} from 'react-redux-firebase';
import { connect } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Events = ({ events }) => {
  //Database listener pass in the collection we are listening to
  useFirestoreConnect('events');

  const firestore = useFirestore();
  const history = useHistory();

  const onDelete = (e, id) => {
    console.log(id);
    firestore
      .collection('events')
      .doc(id)
      .delete()
      .then(() => console.log('Event deleted'));
    //redirect to dashboard
    history.push('/');
  };

  console.log(events);
  if (events) {
    return (
      <div className="events row">
        {events.map((event) => (
          <div
            className="col-6 col-md-4 col-lg-3 px-3 d-flex justify-content-center"
            key={event.id}
          >
            <div className="card">
              <Link to={`/event/${event.id}`}>
                <h4 className="card-header text-center">{event.title}</h4>
              </Link>
              <div className="card-body show-button">
                <div className="row mb-3">
                  <div className="col-2">
                    <FontAwesomeIcon icon="map-marker-alt" size="lg" />
                  </div>
                  <div className="col-10">{event.location}</div>
                </div>

                <div className="row">
                  <div className="col-2">
                    <FontAwesomeIcon icon="calendar-alt" size="lg" />
                  </div>

                  <div className="col-10">{event.date}</div>
                </div>
                <div className="d-flex justify-content-end mb-5">
                  <button
                    className="btn btn-delete"
                    type="submit"
                    onClick={(e) => onDelete(e, event.id)}
                  >
                    <FontAwesomeIcon icon="trash" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  } else {
    return <Spinner />;
  }
};

Events.propTypes = {
  firestore: PropTypes.object.isRequired,
  events: PropTypes.array,
};

const enhance = compose(
  withFirestore,
  connect((state) => ({
    events: state.firestore.ordered.events,
  }))
);

export default enhance(Events);
