'use client';

import React from 'react';
import { Task } from '@/types';
import TaskItem from './TaskItem';

interface TaskListProps {
  tasks: Task[];
  onTaskUpdate: (task: Task) => void;
  onTaskDelete: (taskId: number) => void;
  onTaskToggle: (taskId: number) => void;
  loading?: boolean;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onTaskUpdate,
  onTaskDelete,
  onTaskToggle,
  loading = false,
}) => {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-gray-400">
        <div className="w-12 h-12 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin mb-4"></div>
        <p className="text-base font-medium">Loading tasks...</p>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 shadow-2xl hover:shadow-cyan-500/20 transition-all duration-300">
        <div className="w-20 h-20 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-2xl flex items-center justify-center mb-5 shadow-inner">
          <svg className="w-10 h-10 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2">No tasks yet</h3>
        <p className="text-gray-400 text-base max-w-xs mx-auto">
          Get started by creating your first task using the "New Task" button above.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden flex flex-col rounded-2xl border border-gray-700/50 bg-gray-800/50 backdrop-blur-xl shadow-2xl hover:shadow-cyan-500/20 transition-all duration-300">
      <div className="flex-grow overflow-y-auto max-h-[500px]">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onEdit={onTaskUpdate}
            onDelete={onTaskDelete}
            onToggle={onTaskToggle}
          />
        ))}
      </div>

      {/* Footer / Summary stats */}
      <div className="p-4 bg-gradient-to-r from-gray-800/80 to-cyan-500/10 border-t border-gray-700/50 flex justify-between items-center text-sm font-medium text-gray-300">
        <span>{tasks.length} total tasks</span>
        <span>{tasks.filter(t => t.status === 'completed').length} completed</span>
      </div>
    </div>
  );
};

export default TaskList;