import React, { Component } from "react";
import "./loader.css";

export class Loader extends Component {
  render() {
    return (
      <div className="center">
        <div className="ring"></div>
        <span className="loader">loading...</span>
      </div>
    );
  }
}
