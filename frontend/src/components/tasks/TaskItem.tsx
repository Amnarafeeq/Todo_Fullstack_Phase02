'use client';

import React from 'react';
import { Task } from '@/types';

interface TaskItemProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (taskId: number) => void;
  onToggle: (taskId: number) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onEdit,
  onDelete,
  onToggle,
}) => {
  const isCompleted = task.status === 'completed';

  const getPriorityBadgeClass = (priority: Task['priority']) => {
    switch (priority) {
      case 'high':
        return 'badge-danger';
      case 'medium':
        return 'badge-warning';
      case 'low':
        return 'badge-success';
      default:
        return 'badge-default';
    }
  };

  return (
    <div className={`p-5 flex items-center gap-5 transition-all duration-300 hover:bg-gradient-to-r from-[#42aec9]/5 to-[#2f6978]/5 group border-b border-gray-100/50 last:border-0 bg-white/80 hover:bg-white rounded-xl mx-2 my-2 hover:shadow-md hover:border-gray-200/70`}>
      {/* Complete Checkbox */}
      <div className="flex-shrink-0">
        <label className="relative flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={isCompleted}
            onChange={() => onToggle(task.id)}
            className="sr-only peer"
            aria-label={`Mark task "${task.title}" as ${isCompleted ? 'completed' : 'pending'}`}
          />
          <div className={`w-6 h-6 rounded-lg transition-all duration-300 flex items-center justify-center ${
            isCompleted
              ? 'bg-gradient-to-br from-[#42aec9] to-[#2f6978] border border-[#42aec9]/20 shadow-sm'
              : 'border-2 border-gray-300 hover:border-[#42aec9] bg-white shadow-sm'
          } group-hover:scale-110`}>
            {isCompleted ? (
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="3"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <div className="w-3 h-3 rounded-sm bg-transparent"></div>
            )}
          </div>
        </label>
      </div>

      {/* Task Content */}
      <div className="flex-grow min-w-0">
        <div className="flex items-center gap-3 mb-1">
          <h3
            className={`text-base font-semibold truncate transition-all duration-300 ${
              isCompleted ? 'text-gray-500 line-through' : 'text-gray-900 group-hover:text-[#2f6978]'
            }`}
          >
            {task.title}
          </h3>
          {/* Status indicator for pending tasks */}
          {!isCompleted && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-800 border border-yellow-200 shadow-sm">
              Pending
            </span>
          )}
          <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium shadow-sm ${
            task.priority === 'high'
              ? 'bg-gradient-to-r from-red-100 to-red-200 text-red-800 border border-red-200'
              : task.priority === 'medium'
                ? 'bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-800 border border-yellow-200'
                : 'bg-gradient-to-r from-green-100 to-green-200 text-green-800 border border-green-200'
          }`}>
            {task.priority}
          </span>
          {task.category && (
            <span className="text-xs px-2.5 py-0.5 rounded-full font-medium bg-gradient-to-r from-[#42aec9]/20 to-[#2f6978]/20 text-[#2f6978] border border-[#42aec9]/30 shadow-sm">
              {task.category}
            </span>
          )}
        </div>
        {task.description && (
          <p
            className={`text-sm truncate transition-all duration-300 ${
              isCompleted ? 'text-gray-500' : 'text-gray-600'
            }`}
          >
            {task.description}
          </p>
        )}
      </div>

      {/* Actions */}
      <div className="flex-shrink-0 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300">
        <button
          onClick={() => onEdit(task)}
          className="p-2 text-gray-500 hover:text-[#42aec9] hover:bg-[#42aec9]/10 rounded-lg transition-all duration-300 hover:scale-110 hover:bg-gradient-to-br from-[#42aec9]/10 to-[#2f6978]/10 shadow-sm hover:shadow-md"
          title="Edit task"
          aria-label={`Edit task "${task.title}"`}
          type="button"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
          </svg>
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-300 hover:scale-110 hover:bg-gradient-to-br from-red-50 to-red-100 shadow-sm hover:shadow-md"
          title="Delete task"
          aria-label={`Delete task "${task.title}"`}
          type="button"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default React.memo(TaskItem);
