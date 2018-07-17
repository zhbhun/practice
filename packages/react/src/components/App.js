import React, { PureComponent } from "react";
import { TodoFilters } from "../constants";
import Header from "./Header";
import MainSection from "./MainSection";

class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      todos: [
        {
          text: "Use React",
          completed: false,
          id: 0
        }
      ],
      visibilityFilter: TodoFilters.SHOW_ALL
    };
  }

  addTodo = text => {
    this.setState(({ todos }) => ({
      todos: [
        ...todos,
        {
          id: todos.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
          completed: false,
          text: text
        }
      ]
    }));
  };

  deleteTodo = id => {
    this.setState(({ todos }) => ({
      todos: todos.filter(todo => todo.id !== id)
    }));
  };

  editTodo = ({ id, text }) => {
    this.setState(({ todos }) => ({
      todos: todos.map(
        todo => (todo.id === id ? { ...todo, text: text } : todo)
      )
    }));
  };

  completeTodo = id => {
    this.setState(({ todos }) => ({
      todos: todos.map(
        todo =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    }));
  };

  completeAllTodos = () => {
    this.setState(({ todos }) => {
      const areAllMarked = todos.every(todo => todo.completed);
      return {
        todos: todos.map(todo => ({
          ...todo,
          completed: !areAllMarked
        }))
      };
    });
  };

  clearCompleted = () => {
    this.setState(({ todos }) => ({
      todos: todos.filter(todo => todo.completed === false)
    }));
  };

  setVisibilityFilter = filter => {
    this.setState({ visibilityFilter: filter });
  };

  render() {
    const { todos, visibilityFilter } = this.state;
    return (
      <div>
        <Header addTodo={this.addTodo} />
        <MainSection
          actions={{
            addTodo: this.addTodo,
            deleteTodo: this.deleteTodo,
            editTodo: this.editTodo,
            completeTodo: this.completeTodo,
            completeAllTodos: this.completeAllTodos,
            clearCompleted: this.clearCompleted,
            setVisibilityFilter: this.setVisibilityFilter
          }}
          completedCount={todos.reduce(
            (count, todo) => (todo.completed ? count + 1 : count),
            0
          )}
          todos={todos}
          todosCount={todos.length}
          visibilityFilter={visibilityFilter}
        />
      </div>
    );
  }
}

export default App;
