import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './style.scss';

// Redux imports
import { Provider } from 'react-redux';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import store from './store';
import rrfProps from './components/config/rrfProps';

// Font awesome stuff
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import {
  faPlus,
  faMapMarkerAlt,
  faCalendarAlt,
  faEdit,
  faTrash,
  faPen,
  faArrowLeft,
  faChevronLeft,
} from '@fortawesome/free-solid-svg-icons';

//import components
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import AddEvent from './components/events/AddEvent';
import AddFood from './components/events/AddFood';
import AddDrink from './components/events/AddDrink';
import EventDetail from './components/events/EventDetails';
import EditEvent from './components/events/EditEvent';

const App = () => {
  //create a fontawesome library
  library.add(
    fab,
    faPlus,
    faMapMarkerAlt,
    faCalendarAlt,
    faEdit,
    faTrash,
    faPen,
    faArrowLeft,
    faChevronLeft
  );

  return (
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <Router>
          <Header />
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route exact path="/event/add" component={AddEvent} />
            <Route exact path="/event/:id" component={EventDetail} />
            <Route exact path="/event/edit/:id" component={EditEvent} />
            <Route exact path="/event/food/:id" component={AddFood} />
            <Route exact path="/event/addDrink" component={AddDrink} />
          </Switch>
        </Router>
      </ReactReduxFirebaseProvider>
    </Provider>
  );
};

export default App;
