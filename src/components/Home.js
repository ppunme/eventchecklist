import React, { Component } from 'react';

export class Home extends Component {
  render() {
    return (
      <div class="home">
        <h1 class="text-center">Event Checklist</h1>
        <button type="button" class="btn btn-primary mb-4">
          Add an Event
        </button>

        <div class="card">
          <h5 class="card-header">Event name</h5>
          <div class="card-body">
            <h5 class="card-title">Special title treatment</h5>
            <p class="card-text">
              With supporting text below as a natural lead-in to additional
              content.
            </p>
            <a href="/" class="btn btn-warning">
              Go somewhere
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
