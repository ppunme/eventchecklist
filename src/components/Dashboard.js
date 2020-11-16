import React from 'react';
import { Link } from 'react-router-dom';
import Event from './events/Events';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Dashboard = () => {
  return (
    <div className="dashboard pt-5 mt-3">
      <h1 className="text-center pt-4 title">Dashboard</h1>
      <div className="container-fluid">
        <div className="d-flex justify-content-end add-event-btn">
          <Link to="/event/add" type="button" className="btn btn-add">
            Add Event
          </Link>
        </div>
        <Event />
      </div>
    </div>
  );
};

export default Dashboard;
