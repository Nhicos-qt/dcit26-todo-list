import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const GROUPS_KEY = 'dcit26-groups';
const TASKS_KEY = 'dcit26-tasks';

const defaultGroups = [
  { id: 'school', name: 'School Activities', createdAt: new Date().toISOString() },
  { id: 'personal', name: 'Personal Tasks', createdAt: new Date().toISOString() },
  { id: 'projects', name: 'Projects', createdAt: new Date().toISOString() },
  { id: 'daily', name: 'Daily Tasks', createdAt: new Date().toISOString() },
];

const createId = (prefix) => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return `${prefix}-${crypto.randomUUID()}`;
  }

  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

const safeRead = (key, fallback) => {
  try {
    const saved = localStorage.getItem(key);
    if (!saved) return fallback;
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) ? parsed : fallback;
  } catch {
    return fallback;
  }
};

const TaskContext = createContext(null);

export function TaskProvider({ children }) {
  const [groups, setGroups] = useState(() => {
    const stored = safeRead(GROUPS_KEY, defaultGroups);
    return stored.length ? stored : defaultGroups;
  });

  const [tasks, setTasks] = useState(() => safeRead(TASKS_KEY, []));

  useEffect(() => {
    try {
      localStorage.setItem(GROUPS_KEY, JSON.stringify(groups));
    } catch (error) {
      console.error('Could not save groups to localStorage:', error);
    }
  }, [groups]);

  useEffect(() => {
    try {
      localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
    } catch (error) {
      console.error('Could not save tasks to localStorage:', error);
    }
  }, [tasks]);

  const addGroup = (name) => {
    const cleanedName = name.trim();

    if (!cleanedName) {
      return { ok: false, error: 'Group name cannot be empty.' };
    }

    const duplicate = groups.some(
      (group) => group.name.trim().toLowerCase() === cleanedName.toLowerCase()
    );

    if (duplicate) {
      return { ok: false, error: 'A group with that name already exists.' };
    }

    const newGroup = {
      id: createId('group'),
      name: cleanedName,
      createdAt: new Date().toISOString(),
    };

    setGroups((current) => [...current, newGroup]);
    return { ok: true, group: newGroup };
  };

  const deleteGroup = (groupId) => {
    setGroups((current) => current.filter((group) => group.id !== groupId));
    setTasks((current) => current.filter((task) => task.groupId !== groupId));
  };

  const addTask = (groupId, title) => {
    const cleanedTitle = title.trim();

    if (!cleanedTitle) {
      return { ok: false, error: 'Task title cannot be empty.' };
    }

    const newTask = {
      id: createId('task'),
      groupId,
      title: cleanedTitle,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    setTasks((current) => [...current, newTask]);
    return { ok: true, task: newTask };
  };

  const toggleTask = (taskId) => {
    setTasks((current) =>
      current.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (taskId) => {
    setTasks((current) => current.filter((task) => task.id !== taskId));
  };

  const getGroupById = (groupId) => groups.find((group) => group.id === groupId) ?? null;

  const getTasksByGroupId = (groupId) => tasks.filter((task) => task.groupId === groupId);

  const getGroupStats = (groupId) => {
    const groupTasks = getTasksByGroupId(groupId);
    return {
      total: groupTasks.length,
      completed: groupTasks.filter((task) => task.completed).length,
      pending: groupTasks.filter((task) => !task.completed).length,
    };
  };

  const totalStats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((task) => task.completed).length;
    const pending = total - completed;

    return { total, completed, pending };
  }, [tasks]);

  const value = useMemo(
    () => ({
      groups,
      tasks,
      addGroup,
      deleteGroup,
      addTask,
      toggleTask,
      deleteTask,
      getGroupById,
      getTasksByGroupId,
      getGroupStats,
      totalStats,
    }),
    [groups, tasks, totalStats]
  );

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}

export function useTaskContext() {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error('useTaskContext must be used inside a TaskProvider');
  }

  return context;
}
