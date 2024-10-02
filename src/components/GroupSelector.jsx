// src/components/GroupSelector.jsx
import React from 'react';

const GroupSelector = ({ groupBy, setGroupBy }) => {
  return (
    <div className="group-selector">
      <label htmlFor="group-by">Group by: </label>
      <select id="group-by" value={groupBy} onChange={(e) => setGroupBy(e.target.value)}>
        <option value="status">Status</option>
        <option value="user">User</option>
        <option value="priority">Priority</option>
      </select>
    </div>
  );
};

export default GroupSelector;
