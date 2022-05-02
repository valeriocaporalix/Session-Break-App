import './App.css';
import React from 'react';

const minDefault = 25;
const brLengthDefault = 5;
const typeDefault = "Session";
const typeChanged = "Break";
const activationTimerDefault = "off";

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
    time: minDefault*60,
    brLength: brLengthDefault,
    sesLength: minDefault,
    type: typeDefault,
    activationTimer: activationTimerDefault,
    nothingToShow: ""
  };
    this.decSession = this.decSession.bind(this);
    this.incSession = this.incSession.bind(this);
    this.decBreak = this.decBreak.bind(this);
    this.incBreak = this.incBreak.bind(this);
    this.reset = this.reset.bind(this);
    this.startPause = this.startPause.bind(this);
  };
  
  /* Format Time */
  
  format(time) { 
      const date = new Date(time * 1000);
      let hh = date.getUTCHours();
      let mm = date.getUTCMinutes();
      let ss = date.getSeconds();
      if (hh < 10) {hh = "0"+hh;}
      if (mm < 10) {mm = "0"+mm;}
      if (ss < 10) {ss = "0"+ss;}
      return '00' !== hh ? "60"+":"+ss : mm+":"+ss;
    }
  
  /* Timer */
  
  startPause = () => {
    if(this.state.activationTimer === "off") {
    this.setState({
      activationTimer: "on"
    })
    this.timer = setInterval(() => {
      const countDown = this.state.time -1
      if (this.state.time !== 0) {
        this.setState({
        time: countDown >= 0 ? countDown : 0
      });
      } else {
        if(this.state.type === typeDefault) {
          this.beep.play();
          this.setState({
            time: this.state.brLength*60,
            type: typeChanged
      })
      } else if (this.state.type === typeChanged) {
        this.beep.play();
        this.setState({
          time: this.state.sesLength*60,
          type: typeDefault
        })
      }
      }
    }, 1000);
    } else {
      clearInterval(this.timer);
      this.setState({
        activationTimer: "off"
      })
    }
  }
  
  /* Reset Button */

  reset = () => {
    clearInterval(this.timer);
    this.beep.pause();
    this.beep.currentTime = 0;
    this.setState({
      time: minDefault*60,
      brLength: brLengthDefault,
      sesLength: minDefault,
      type: typeDefault,
      activationTimer: activationTimerDefault
    });
  }
  
  /* Break Buttons */
  
  decBreak = () => {
    if(this.state.brLength <= 1) {
      this.setState({
        brLength: 1
      });
    } else {
    this.setState({
      brLength: this.state.brLength -1
      });
    }
    };
  
  incBreak = () => {
    if(this.state.brLength >= 60) {
      this.setState({
        brLength: 60
      });
    } else {
    this.setState({
      brLength: this.state.brLength +1
      });
    }
    };
  
  /* Session Buttons */
  decSession = () => {
    if(this.state.time <= 60) {
      this.setState({
        time: 60
      });
    } else {
    this.setState({
      time: this.state.time -60,
      sesLength: this.state.sesLength -1
      });
    }
    };
  
  incSession = () => {
      if(this.state.time >= 60*60) {
      this.setState({
        time: 60*60
      });
    } else {
    this.setState({
      time: this.state.time +60,
      sesLength: this.state.sesLength +1
      });
    }
    };

  render() {
    return(
      <div id="app">
        <h1 id="title">25 + 5 Clock</h1>
        <p id="codedBy">Coded by Valerio Caporali</p>
        <div id="time-left-div">
          <h2 id="time-left">{this.format(this.state.time)}</h2>
          <h2 id="timer-label">{this.state.type}</h2>  
        </div>
        <div id="break-label">
          <h2 id="div-title">Break Length</h2>
          <button id="break-decrement" onClick={this.decBreak}>-</button>
          <button id="break-increment" onClick={this.incBreak}>+</button>
          <h3 id="break-length">{this.state.brLength}</h3>
        </div>
        <div id="session-label">
          <h2 id="div-title">Session Length</h2>
          <button id="session-decrement" onClick={this.decSession}>-</button>
          <button id="session-increment" onClick={this.incSession}>+</button>
          <h3 id="session-length">{this.state.sesLength}</h3>
        </div>
        <div id="btn-label">
          <h2 id="div-title">{this.state.nothingToShow}</h2>
          <button id="start_stop" onClick={this.startPause}>&#5125;</button>
          <button id="reset" onClick={this.reset}>&#8634;</button>
        </div>
        <audio
          id="beep"
          preload="auto"
          ref={(a) => {
            this.beep = a;
          }}
          src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
        />
      </div>
    );
  }
}

export default App;
