import React, { Component } from 'react';

class Week extends Component {
  constructor() {
    super();
  }

  render() {
    return (
        <div className="week">
          <ul className="days">
          {this.props.forecast.map((e, i) => (i !== 0) ?
          <li key={i}>
            <div className="week-day">{e.day}</div>
            <div className="week-image"><img src={`icons/${e.description}.png`} /></div>
          <div className="week-temp">{Math.ceil(e.temp)}°C</div>
          </li>
          : '')}
          </ul>
          </div>
    );
  }
}

export default Week;
