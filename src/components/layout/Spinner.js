import React from 'react';
import spinner from './bars.gif';

const Spinner = () => {
  return (
    <div>
      <img
        src={spinner}
        alt="Loading...."
        style={{ width: '150px', margin: 'auto', display: 'block' }}
      />
    </div>
  );
};

export default Spinner;
