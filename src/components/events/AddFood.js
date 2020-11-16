import React, { useState } from 'react';

//redux imports
import { compose } from 'redux';
import { connect } from 'react-redux';
import {
  withFirestore,
  useFirestoreConnect,
  useFirestore,
} from 'react-redux-firebase';
import { useHistory } from 'react-router-dom';

const AddFood = (props) => {
  const id = props.match.params.id;

  const [foods, setFood] = useState({
    foodname: '',
    id: props.match.params.id,
  });
  const { foodname } = foods;

  //add in database config and listeners
  const firestore = useFirestore();

  const onChange = (e) => {
    setFood({
      ...foods,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const newFood = foods;

    firestore
      .collection('events')
      .doc(id)
      .collection('food')
      .add(newFood)
      .then(() => console.log('Food added'));
  };

  const showList = (id) => {
    firestore
      .collectionGroup('food')
      .where('id', '==', id)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          console.log(doc.id, ' => ', doc.data());
        });
      });
  };

  return (
    <div className="add-food d-flex justify-content-center">
      <div className="card">
        <div className="card-body">
          <form onSubmit={(e, id) => onSubmit(e, id)}>
            <input
              type="text"
              className="form-control text-capitalize"
              name="foodname"
              placeholder="add a todo item"
              value={foodname}
              onChange={(e) => onChange(e)}
            />
            <button className="btn btn-success" type="submit">
              Add
            </button>
          </form>

          <button className="btn btn-success" onClick={() => showList(id)}>
            Get list
          </button>
          <ul className="list-group">
            <li className="list-group-item">Cras justo odio</li>
            <li className="list-group-item">Dapibus ac facilisis in</li>
            <li className="list-group-item">Morbi leo risus</li>
            <li className="list-group-item">Porta ac consectetur ac</li>
            <li className="list-group-item">Vestibulum at eros</li>
          </ul>
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

export default enhance(AddFood);
