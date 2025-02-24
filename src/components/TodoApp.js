import React, { useState, useEffect } from 'react';
import { PlusIcon, TrashIcon, PencilIcon, CheckIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { motion, AnimatePresence } from 'framer-motion';

function TodoApp() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [newTodo, setNewTodo] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');
  const [filter, setFilter] = useState('all'); // all, active, completed

  // Save todos to localStorage
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;
    
    setTodos([...todos, {
      id: Date.now(),
      text: newTodo.trim(),
      completed: false,
      createdAt: new Date().toISOString()
    }]);
    setNewTodo('');
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const startEditing = (todo) => {
    setEditingId(todo.id);
    setEditText(todo.text);
  };

  const saveEdit = (id) => {
    if (!editText.trim()) return;
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, text: editText.trim() } : todo
    ));
    setEditingId(null);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditText('');
  };

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-white to-background py-12 px-4">
      <div className="max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-xl p-6 mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center justify-between">
            <span>Task Manager</span>
            <span className="text-sm font-normal text-gray-500">
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long',
                month: 'long',
                day: 'numeric'
              })}
            </span>
          </h2>
          
          <form onSubmit={handleSubmit} className="mb-6">
            <div className="flex gap-2">
              <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="What needs to be done?"
                className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
              />
              <button
                type="submit"
                className="group relative inline-flex items-center gap-2 bg-primary px-4 py-3 rounded-lg font-semibold text-white overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <PlusIcon className="h-5 w-5" />
                  <span>Add</span>
                </span>
                <div className="absolute inset-0 bg-secondary transform origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-300" />
              </button>
            </div>
          </form>

          <div className="flex gap-2 mb-6">
            {['all', 'active', 'completed'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`group relative px-4 py-2 rounded-lg capitalize overflow-hidden ${
                  filter === f 
                    ? 'text-white' 
                    : 'text-gray-600 hover:text-white'
                }`}
              >
                <span className="relative z-10">{f}</span>
                <div className={`absolute inset-0 ${
                  filter === f 
                    ? 'bg-primary' 
                    : 'bg-gray-200 group-hover:bg-primary transform origin-left scale-x-0 group-hover:scale-x-100'
                } transition-transform duration-300`} />
              </button>
            ))}
          </div>

          <AnimatePresence>
            {filteredTodos.length > 0 ? (
              <motion.ul 
                className="space-y-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {filteredTodos.map(todo => (
                  <motion.li
                    key={todo.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="flex items-center gap-3 bg-white p-4 rounded-xl border border-gray-100 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 transition-all duration-200 group"
                  >
                    {editingId === todo.id ? (
                      <div className="flex-1 flex items-center gap-2">
                        <input
                          type="text"
                          value={editText}
                          onChange={(e) => setEditText(e.target.value)}
                          className="flex-1 px-3 py-1 border-2 border-primary rounded-lg focus:outline-none"
                          autoFocus
                        />
                        <button
                          onClick={() => saveEdit(todo.id)}
                          className="group relative p-2 rounded-lg overflow-hidden"
                        >
                          <span className="relative z-10 text-green-500 group-hover:text-white">
                            <CheckIcon className="h-5 w-5" />
                          </span>
                          <div className="absolute inset-0 bg-green-500 transform origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-300" />
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="group relative p-2 rounded-lg overflow-hidden"
                        >
                          <span className="relative z-10 text-red-500 group-hover:text-white">
                            <XMarkIcon className="h-5 w-5" />
                          </span>
                          <div className="absolute inset-0 bg-red-500 transform origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-300" />
                        </button>
                      </div>
                    ) : (
                      <>
                        <div className="relative flex items-center justify-center w-6 h-6 group/checkbox">
                          <input
                            type="checkbox"
                            checked={todo.completed}
                            onChange={() => toggleTodo(todo.id)}
                            className="absolute w-6 h-6 cursor-pointer opacity-0 z-20"
                          />
                          <div className={`absolute inset-0 z-10 border-2 rounded-md transition-all duration-200 ${
                            todo.completed 
                              ? 'border-primary bg-primary/10' 
                              : 'border-gray-300 bg-white hover:border-primary/50'
                          }`} />
                          <CheckIcon 
                            className={`h-4 w-4 z-10 pointer-events-none transition-all duration-200 ${
                              todo.completed 
                                ? 'text-primary opacity-100 scale-100' 
                                : 'text-primary/50 opacity-0 scale-0 group-hover/checkbox:opacity-50'
                            }`}
                          />
                        </div>
                        <div className="flex-1 flex flex-col">
                          <span className={`text-lg transition-all duration-200 ${
                            todo.completed 
                              ? 'line-through text-gray-400' 
                              : 'text-gray-700'
                          }`}>
                            {todo.text}
                          </span>
                          <span className="text-xs text-gray-400">
                            {new Date(todo.createdAt).toLocaleDateString('en-US', {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-200 -mr-1">
                          <button
                            onClick={() => startEditing(todo)}
                            className="group relative p-2 rounded-lg overflow-hidden"
                          >
                            <span className="relative z-10 text-blue-500 group-hover:text-white">
                              <PencilIcon className="h-4 w-4" />
                            </span>
                            <div className="absolute inset-0 bg-blue-500 transform origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-300" />
                          </button>
                          <button
                            onClick={() => deleteTodo(todo.id)}
                            className="group relative p-2 rounded-lg overflow-hidden"
                          >
                            <span className="relative z-10 text-red-500 group-hover:text-white">
                              <TrashIcon className="h-4 w-4" />
                            </span>
                            <div className="absolute inset-0 bg-red-500 transform origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-300" />
                          </button>
                        </div>
                      </>
                    )}
                  </motion.li>
                ))}
              </motion.ul>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-8"
              >
                <div className="text-gray-400 mb-3">
                  <svg className="w-16 h-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <p className="text-gray-500 text-lg">
                  {filter === 'all' 
                    ? "Your todo list is empty. Start adding tasks!"
                    : `No ${filter} tasks found.`}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {todos.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-between items-center text-gray-500 px-2"
          >
            <span>
              {todos.filter(t => t.completed).length} of {todos.length} completed
            </span>
            <button
              onClick={clearCompleted}
              className="group relative px-4 py-2 rounded-lg overflow-hidden font-medium"
            >
              <span className="relative z-10 text-red-500 group-hover:text-white">
                Clear completed
              </span>
              <div className="absolute inset-0 bg-red-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default TodoApp; 