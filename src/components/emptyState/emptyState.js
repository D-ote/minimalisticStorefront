import React from "react";
import { NullState } from "../../assets";
import "./emptyState.css";

const EmptyState = () => {
  return (
    <div className="empty-state">
      <img src={NullState} alt="empty state" />
      <p>No product selected</p>
    </div>
  );
};

export default EmptyState;
