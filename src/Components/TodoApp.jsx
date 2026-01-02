import React from "react";
import { CheckCircle2, Circle, Filter, Plus, Trash2 } from "lucide-react";
import TodoFilters from "./TodoFilters";
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";
import { useDispatch, useSelector } from "react-redux";
import {
  selectTodos,
  selectFilteredTodos,
  selectTodosStats,
  SelectFilter,
  selectIsAddingTodo,
} from "../store/selectors";
import { setIsAddingTodo } from "../store/todoSlice";

function TodoApp() {
  const dispatch = useDispatch();
  const todos = useSelector(selectTodos);
  const filteredTodos = useSelector(selectFilteredTodos);
  const stats = useSelector(selectTodosStats);
  const filter = useSelector(SelectFilter);
  const isAddingTodo = useSelector(selectIsAddingTodo);

  const handleAddTodoClick = () => {
    dispatch(setIsAddingTodo(true));
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-100 via-gray-200 to-gray-300 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Todo-Flow</h1>
          <p>Organize your life, one task at a time.</p>
        </div>

        {/* Stats Card */}
        {stats.total > 0 && (
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 my-6 border border-gray-300 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">
                Progress Overview
              </h2>
              <div className="text-2xl font-bold text-green-600">
                {/* Stats Completed Logic */}
                {stats.completionPercentage}%
              </div>
            </div>
            <div className="w-full bg-gray-300 rounded-full h-3 mb-4">
              {/* Progress Bar */}
              <div
                className="bg-linear-to-r from-green-500 to-green-600 h-3 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${stats.completionPercentage}%` }}
              ></div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-gray-800">
                  {/* Stats Total Logic */}
                  {stats.total}
                </div>
                <div className="text-sm text-gray-600">Total</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-800">
                  {/* Stats Active Logic */}
                  {stats.active}
                </div>
                <div className="text-sm text-gray-600">Active</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-800">
                  {/* Stats Completed Logic */}
                  {stats.completed}
                </div>
                <div className="text-sm text-gray-600">Completed</div>
              </div>
            </div>
          </div>
        )}

        {/* Todo Components */}
        <div className="bg-white/90 backdrop-blur-sm rounded-b-2xl border border-gray-300 shadow-lg overflow-hidden">
          {/* Action Bar */}
          <div className="p-6 border-b border-gray-300">
            <div className="flex items-center justify-between mb-4">
              <button
                className="flex items-center gap-3 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 font-medium cursor-pointer"
                onClick={handleAddTodoClick}
              >
                <Plus size={20} />
                Add Todo
              </button>

              {/* Clear and Delete Buttons */}
              {stats.total > 0 && (
                <div className="flex items-center gap-2">
                  {stats.completed > 0 && (
                    <button className=" flex items-center gap-3 text-red-600 hover:text-red-700 px-3 py-2 rounded-lg hover:bg-red-50 transition-colors duration-200 text-sm">
                      <Trash2 size={16} />
                      Clear Completed
                    </button>
                  )}
                  {stats.active > 0 && (
                    <button className=" flex items-center gap-3 text-green-600 hover:text-green-700 px-3 py-2 rounded-lg hover:bg-green-50 transition-colors duration-200 text-sm">
                      <CheckCircle2 size={16} />
                      Mark All Completed
                    </button>
                  )}
                </div>
              )}
            </div>
            {/* Todo Filters */}
            <TodoFilters currentFilter={filter} stats={stats} />
          </div>
          {/* Todo Form */}
          {isAddingTodo && (
            <div className="p-6 border-b border-gray-300 bg-gray-100">
              <TodoForm placeholder="Add a new todo..." />
            </div>
          )}

          {/* Todo List */}
          <div className="max-h-96 overflow-y-auto">
            {filteredTodos.length === 0 ? (
              <div className="p-12 text-center">
                {todos.length === 0 ? (
                  <div className="text-gray-600">
                    <Circle size={48} className="mx-auto mb-4 opacity-50" />
                    <p className="text-lg font-medium mb-2 text-gray-800">
                      No todos Yet
                    </p>
                    <p>Add your first todo to get started!</p>
                  </div>
                ) : (
                  /* Conditional rendering will add logics later */
                  <div className="text-gray-600">
                    <Filter size={48} className="mx-auto mb-4 opacity-50" />
                    <p className="text-lg font-medium mb-2 text-gray-800">
                      No {filter} Todos
                      {/* Will manage it on later */}
                      <p className="text-sm">
                        {filter === "completed" &&
                          "all your todos are completed!"}
                        {filter === "active" &&
                          "No completed todos yet, keep going!"}
                      </p>
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="divide-y divide-gray-300">
                {filteredTodos.map((todo, index) => (
                  <TodoItem key={todo.id} todo={todo} index={index} />
                ))}
              </div>
            )}
          </div>
        </div>
        {/* Footer */}
        <div>
          <p className="text-center text-sm text-gray-700 mt-6">
            &copy; {new Date().getFullYear()} Todo-Flow. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}

export default TodoApp;
