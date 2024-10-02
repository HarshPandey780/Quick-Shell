import React from 'react';

const TicketCard = ({ ticket }) => {
  return (
    <div className={`ticket-card priority-${ticket.priority}`}>
      <h3>{ticket.title}</h3>
      <p>{ticket.description}</p>
      <p>Assigned to: {ticket.assignedUser}</p>
      <p>Priority: {ticket.priority}</p>
    </div>
  );
};

export default TicketCard;
