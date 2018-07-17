import React from "react";
import PropTypes from "prop-types";
import { TodoFilters } from "../constants";
import Link from "./Link";

const { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } = TodoFilters;

const FILTER_TITLES = {
  [SHOW_ALL]: "All",
  [SHOW_ACTIVE]: "Active",
  [SHOW_COMPLETED]: "Completed"
};

const Footer = props => {
  const {
    activeCount,
    completedCount,
    onClearCompleted,
    visibilityFilter,
    setVisibilityFilter
  } = props;
  const itemWord = activeCount === 1 ? "item" : "items";
  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{activeCount || "No"}</strong> {itemWord} left
      </span>
      <ul className="filters">
        {Object.keys(FILTER_TITLES).map(filter => (
          <li key={filter}>
            <Link
              active={filter === visibilityFilter}
              setFilter={() => setVisibilityFilter(filter)}
            >
              {FILTER_TITLES[filter]}
            </Link>
          </li>
        ))}
      </ul>
      {!!completedCount && (
        <button className="clear-completed" onClick={onClearCompleted}>
          Clear completed
        </button>
      )}
    </footer>
  );
};

Footer.propTypes = {
  completedCount: PropTypes.number.isRequired,
  activeCount: PropTypes.number.isRequired,
  onClearCompleted: PropTypes.func.isRequired,
  visibilityFilter: PropTypes.string.isRequired,
  setVisibilityFilter: PropTypes.func.isRequired,
};

export default Footer;
