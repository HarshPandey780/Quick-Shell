import React, { useEffect, useState } from "react";
import TicketCard from "./TicketCard"; // Import your TicketCard component
import GroupSelector from "./GroupSelector"; // Import your GroupSelector component
import "../KanbanBoard.css"; // Import your CSS file

const KanbanBoard = () => {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]); // Add state for users
  const [groupBy, setGroupBy] = useState("status"); // Default grouping
  const [sortBy, setSortBy] = useState("priority"); // Default sorting
  const [groupedTickets, setGroupedTickets] = useState({});

  useEffect(() => {
    const fetchTicketsAndUsers = async () => {
      try {
        const response = await fetch("https://api.quicksell.co/v1/internal/frontend-assignment");
        const data = await response.json();
        setTickets(data.tickets); // Set tickets from API
        setUsers(data.users); // Set users from API
      } catch (error) {
        console.error("Error fetching tickets and users:", error);
      }
    };
    fetchTicketsAndUsers();
  }, []);

  useEffect(() => {
    groupTickets();
  }, [tickets, groupBy]);

  const groupTickets = () => {
    let grouped;
    if (groupBy === "user") {
      grouped = users.reduce((acc, user) => {
        acc[user.name] = tickets.filter((ticket) => ticket.user === user.id);
        return acc;
      }, {});
    } else if (groupBy === "priority") {
      grouped = {
        Urgent: tickets.filter((ticket) => ticket.priority === 4),
        High: tickets.filter((ticket) => ticket.priority === 3),
        Medium: tickets.filter((ticket) => ticket.priority === 2),
        Low: tickets.filter((ticket) => ticket.priority === 1),
        "No priority": tickets.filter((ticket) => ticket.priority === 0),
      };
    } else {
      grouped = tickets.reduce((acc, ticket) => {
        const key = ticket[groupBy]; // Use the selected groupBy field
        if (!acc[key]) {
          acc[key] = [];
        }
        acc[key].push(ticket);
        return acc;
      }, {});
    }
    setGroupedTickets(grouped);
  };

  const sortTickets = (ticketsToSort, criteria) => {
    return ticketsToSort.sort((a, b) => {
      if (criteria === "priority") {
        return b.priority - a.priority; // Sort in descending order of priority
      }
      if (criteria === "title") {
        return a.title.localeCompare(b.title); // Sort by title in ascending order
      }
      return 0;
    });
  };

  return (
    <div className="kanban-board">
      <div className="controls">
        <GroupSelector groupBy={groupBy} setGroupBy={setGroupBy} />
        <label htmlFor="sort-by">Sort by: </label>
        <select id="sort-by" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="priority">Priority</option>
          <option value="title">Title</option>
        </select>
      </div>

      {/* Grouping by Status, User, or displaying Priority */}
      <div className="groups-container">
        {Object.entries(groupedTickets).map(([group, ticketsInGroup]) => (
          <div key={group} className="group">
            <h2>{group}</h2>
            <div className="tickets-container">
              {sortTickets(ticketsInGroup, sortBy).map((ticket) => (
                <TicketCard key={ticket.id} ticket={ticket} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;
