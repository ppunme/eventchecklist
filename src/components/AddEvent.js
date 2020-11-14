import React, { Component } from 'react';

export class AddEvents extends Component {
  render() {
    return (
      <div className="AddEvent">
        <h3>Add event</h3>
        <form>
          <div>
            <label>Title</label>
            <br />
            <input type="text" ref="title" />
          </div>

          <div>
            <label>Category</label>
            <br />
            <select ref="category">aaaa</select>
          </div>
          <br />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default AddEvents;
