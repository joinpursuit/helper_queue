// Code taken from  https://marmelab.com/blog/2016/08/29/auto-reload-spa-on-mobile-setinterval.html


import React, { Component } from "react";
import timer from "battery-friendly-timer";

class AutoReload extends Component {
  constructor(props) {
    super(props);
    this.previousHash = null;
    this.state = {
      codeHasChanged: false,
    };
    this.fetchSource = this.fetchSource.bind(this);
  }

  componentDidMount() {
    const { tryDelay, forceDelay } = this.props;
    this.fetchSource();
    this.interval = timer.setInterval(this.fetchSource, tryDelay, forceDelay);
  }

  componentWillUnmount() {
    timer.clearInterval(this.interval);
  }

  fetchSource() {
      console.log("FETCH")
    return fetch(this.props.url)
      .then((response) => {
        if (response.status !== 200) {
          throw new Error("offline");
        }
        return response.text();
      })
      .then((html) => {
          // console.log("HTML", html)
        const hash = this.hash(html);
        if (!this.previousHash) {
          this.previousHash = hash;
          return;
        }
        if (this.previousHash !== hash) {
          this.previousHash = hash;
          this.setState({ codeHasChanged: true });
        }
      })
      .catch((err) => {
        console.log(err)
      });
  }

  /**
   * Java-like hashCode function for strings
   *
   * taken from http://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript-jquery/7616484#7616484
   */
  hash(str) {
    const len = str.length;
    let hash = 0;
    if (len === 0) return hash;
    let i;
    for (i = 0; i < len; i++) {
      hash = (hash << 5) - hash + str.charCodeAt(i);
      hash |= 0; // Convert to 32bit integer
    }
    return hash;
  }

  reloadApp(e) {
    window.location.reload(true);
    e.preventDefault();
  }

  render() {
    if (!this.state.codeHasChanged) return null;
    window.updateRequired = true;
    return null; 
    const style = {
      position: "absolute",
      top: 10,
      right: 10,
      padding: "1em",
      zIndex: 1050,
      backgroundColor: "pink",
      borderRadius: 5,
      textAlign: "center",
    };
    return (
      <div style={style}>
        <div>There has been an update.</div>
        <div>
          <a href="#" onClick={this.reloadApp}>
            Please Click To Reload
          </a>
        </div>
      </div>
    );
  }
}


export default AutoReload;
