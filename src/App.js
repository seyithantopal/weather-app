import React, { Component } from 'react';
import './App.css';

import Card from './Card';
import Week from './Week';


const API_KEY = '6e10732b29bfae0e37d0b5ad986abb35';


class App extends Component {
  constructor() {
    super();
    this.cities = [
      {'id': 2643743, 'name': 'London'},
      {'id': 5128581, 'name': 'New York City'},
      {'id': 5391959, 'name': 'San Francisco'},
      {'id': 4887398, 'name': 'Chicago'}
    ];
    this.days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    this.cached = {};
    this.state = {
      city: 2643743,
      info: {},
      forecast: []
    };
    this.findWeather();
  }

  render() {
      return (
          <div id="container">
          <select onChange={this.makeSelection} name="city" value={this.state.city} className="selection">
              {this.cities.map((city, i) => <option key={i} value={city.id}>{city.name}</option>)}
          </select>
          <div className={this.state.city === '5391959' ? "box diff" : "box"}>
            <div className="background"><img src={`background/${this.state.city}.png`} /></div>
                <Card cardInfo={this.state.info} />
                <Week forecast={this.state.forecast} />
          </div>
          </div>
      );
  }

  makeSelection = (event) => {
    this.setState({
      city: event.target.value,
      flag: 1
    }, this.findWeather);
  }

  splitProcess = (data) => {
    let arr = [];
      let index = 0;
      let sum = 0, cnt = 0;
      let date = new Date();
      for(let item of data.list) {
        let dateToString = date.toISOString().split('T')[0].replace(/(\d{4})-(\d{2})-(\d{2})/, '$1-$2-$3')
        if(dateToString === item.dt_txt.substr(0, 10)) {
          sum += item.main.temp;
          cnt++;
          arr[index] = {
            'temp': sum / cnt,
            'description': item.weather[0].main,
            'day': this.days[date.getDay()]
          };
        } else {
          index++;
          sum = 0;
          cnt = 0;
          date.setDate(date.getDate() + 1);
        }
      }
      return arr;
  }

  findWeather = async () => {
    if(this.cached[this.state.city] !== undefined && Date.now() - this.cached[this.state.city].timestamp < 1000 * 60) {
      console.log('Done');
      this.setState({
        info: {
          city: this.cached[this.state.city].city,
          temp: this.cached[this.state.city].temp,
          wind_speed: this.cached[this.state.city].wind_speed,
          humidity: this.cached[this.state.city].humidity,
          description: this.cached[this.state.city].description
        },
        forecast: this.splitProcess(this.cached[this.state.city].forecast)
      });
      return;
    }   

    await fetch(`https://api.openweathermap.org/data/2.5/weather?id=${this.state.city}&units=metric&appid=${API_KEY}`)
    .then(response => response.json())
    .then(data => {
      this.cached[this.state.city] = {
          city: data.name,
          temp: data.main.temp,
          wind_speed: data.wind.speed,
          humidity: data.main.humidity,
          description: data.weather[0].main,
          timestamp: Date.now()
      };
      this.setState({
        info: {
          'city': data.name,
          'temp': data.main.temp,
          'wind_speed': data.wind.speed,
          'humidity': data.main.humidity,
          'description': data.weather[0].main
        }
      });
    });


    await fetch(`https://api.openweathermap.org/data/2.5/forecast?id=${this.state.city}&units=metric&appid=${API_KEY}`)
    .then(response => response.json())
    .then(data => {
      this.cached[this.state.city]['forecast'] = data;
      this.setState({
        forecast: this.splitProcess(data)
      });
    });
  }
}

export default App;