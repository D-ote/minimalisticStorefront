import React, { Component } from "react";
import { NullState } from "../../assets";
import "./emptyState.css";

export class EmptyState extends Component {
  render() {
    return (
      <div className="empty-state">
        <img src={NullState} alt="empty state" />
        <p>No product selected</p>
      </div>
    );
  }
}
