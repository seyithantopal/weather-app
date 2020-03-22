import React, { Component } from 'react';

class Card extends Component {
  constructor(props) {
    super();
  }

  render() {
    
    return (
      <div>
        <div className="city"><span>{this.props.cardInfo['city']}</span></div>
        <div className="card">
    <div className="temp"><span>{Math.ceil(this.props.cardInfo['temp'])}°C</span></div>
        <ul className="info">
    <li><img src={`icons/${this.props.cardInfo['description']}.png`} className="info-image" />{this.props.cardInfo['description']}</li>
            <li><img src="icons/wind.png" className="info-image" />{this.props.cardInfo['wind_speed']} mph</li>
            <li><img src="icons/humidity.png" className="info-image" />{this.props.cardInfo['humidity']}%</li>
        </ul>                    
    </div>
    </div>
    );
  }
}

export default Card;
