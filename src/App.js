import React, { Component } from 'react';
import Timer from './components/Timer.js';
import ButtonContainer from './components/ButtonContainer.js';
import RunesContainer from './components/RunesContainer.js';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      interval: null,
      seconds: 0,
      minutes: 0,
      alertRunes: false,
      goldGiven: 0,
    }
  }

  tick(){
    let updatedTime = this.state.seconds + this.state.minutes * 60;
    if(updatedTime % 300 === 0 && updatedTime !== 0){
      let goldGiven = 2 * this.state.minutes;
      this.setState({
        goldGiven: goldGiven
      })
    }
    updatedTime += 1;
    let newSeconds = updatedTime % 60;
    let newMinutes = Math.floor(updatedTime / 60);
    this.setState({
      seconds: newSeconds,
      minutes: newMinutes,
    });
  }

  startButtonHandle(){
    if(this.state.interval == null){
      let interval = setInterval(() => this.tick(), 100);
      this.setState({
        interval: interval,
      });
    }
  }

  stopButtonHandle(){
    clearInterval(this.state.interval);
    this.setState({
      interval: null,
      seconds: 0,
      minutes: 0,
      alertRunes: false,
      goldGiven: 0,
    });
  }

  render() {
    return (
      <div className="App">
        <div className="mainContainer">
          <div className="Title">Get Runes!</div>

          <Timer minutes={this.state.minutes} seconds={this.state.seconds}></Timer>

          <ButtonContainer handleClickStart={() => this.startButtonHandle()}
                           handleClickStop={() =>this.stopButtonHandle()}>
                           </ButtonContainer>

          <RunesContainer goldGiven={this.state.goldGiven}></RunesContainer>
        </div>
      </div>
    );
  }
}

export default App;
