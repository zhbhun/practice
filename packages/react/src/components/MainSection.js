import React from "react";
import PropTypes from "prop-types";
import { TodoFilters } from "../constants";
import Footer from "./Footer";
import TodoList from "./TodoList";

const { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } = TodoFilters;
const getVisibleTodos = (visibilityFilter, todos) => {
  switch (visibilityFilter) {
    case SHOW_ALL:
      return todos;
    case SHOW_COMPLETED:
      return todos.filter(t => t.completed);
    case SHOW_ACTIVE:
      return todos.filter(t => !t.completed);
    default:
      throw new Error("Unknown filter: " + visibilityFilter);
  }
};

const MainSection = ({
  actions,
  todos,
  todosCount,
  completedCount,
  visibilityFilter
}) => (
  <section className="main">
    {!!todosCount && (
      <span>
        <input
          className="toggle-all"
          type="checkbox"
          checked={completedCount === todosCount}
        />
        <label onClick={actions.completeAllTodos} />
      </span>
    )}
    <TodoList
      filteredTodos={getVisibleTodos(visibilityFilter, todos)}
      actions={actions}
    />
    {!!todosCount && (
      <Footer
        completedCount={completedCount}
        activeCount={todosCount - completedCount}
        onClearCompleted={actions.clearCompleted}
        visibilityFilter={visibilityFilter}
        setVisibilityFilter={actions.setVisibilityFilter}
      />
    )}
  </section>
);

MainSection.propTypes = {
  actions: PropTypes.object.isRequired,
  completedCount: PropTypes.number.isRequired,
  todos: PropTypes.array.isRequired,
  todosCount: PropTypes.number.isRequired,
  visibilityFilter: PropTypes.string.isRequired
};

export default MainSection;
