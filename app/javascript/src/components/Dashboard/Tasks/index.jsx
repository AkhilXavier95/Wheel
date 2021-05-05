import React, { useState, useEffect } from "react";

import { Button, PageLoader } from "neetoui";
import { PageHeading, SubHeader } from "neetoui/layouts";

import notesApi from "apis/notes";
import EmptyState from "components/Common/EmptyState";
import EmptyTaskList from "images/EmptyTaskList";

import ListTasks from "./ListTasks";
import UserDropDown from "./UserDropDown";
import CreateNewTask from "./CreateNewTask";

const Tasks = () => {
  const [loading, setLoading] = useState(true);
  const [taskList, setTaskList] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showNewTaskPane, setShowNewTaskPane] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await notesApi.fetch();
      setTaskList(response.data);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  const onSelectAll = () => {
    const taskIds = taskList.map(task => task.id);
    const selected = taskIds.length === selectedIds.length ? [] : taskIds;
    setSelectedIds(selected);
  };

  const onSelectTask = (event, taskId) => {
    event.stopPropagation();
    const index = selectedIds.indexOf(taskId);
    if (index > -1) {
      setSelectedIds([
        ...selectedIds.slice(0, index),
        ...selectedIds.slice(index + 1),
      ]);
    } else {
      setSelectedIds([...selectedIds, taskId]);
    }
  };

  const editClickAction = () => {};
  const deleteClickAction = () => {};

  const createNewTask = async values => {
    try {
      const { dueDate, showDueDate, tags } = values;
      const newTask = {
        ...values,
        tag: tags.value,
        createdDate: new Date(),
      };
      if (showDueDate) {
        newTask.dueDate = new Date(dueDate);
      }
      await notesApi.create(newTask);
    } catch (err) {
      logger.error(err);
    } finally {
      fetchTasks();
      setShowNewTaskPane(false);
    }
  };

  if (loading) {
    return <PageLoader />;
  }

  return (
    <>
      <PageHeading
        title="Tasks"
        rightButton={() => (
          <div className="flex">
            <Button
              onClick={() => setShowNewTaskPane(true)}
              label="New task"
              icon="ri-add-line"
              className="mr-2"
            />
            <UserDropDown />
          </div>
        )}
      />
      {taskList.length > 0 ? (
        <>
          <SubHeader
            searchProps={{
              value: searchTerm,
              onChange: e => setSearchTerm(e.target.value),
              clear: () => setSearchTerm(""),
            }}
            deleteButtonProps={{
              onClick: () => {},
              disabled: !selectedIds.length,
            }}
            paginationProps={{
              count: 241,
              pageNo: 1,
              pageSize: 50,
            }}
            sortProps={{
              options: [
                { value: "title", label: "Title" },
                { value: "description", label: "Description" },
              ],
              onClick: () => {},
            }}
            toggleFilter={() => {}}
          />
          <ListTasks
            taskList={taskList}
            selectedIds={selectedIds}
            onSelectAll={onSelectAll}
            onSelectTask={onSelectTask}
            editClickAction={editClickAction}
            deleteClickAction={deleteClickAction}
          />
        </>
      ) : (
        <EmptyState
          image={EmptyTaskList}
          title="Your task list is empty"
          subtitle=""
          primaryAction={() => {}}
          primaryActionLabel="New Task"
        />
      )}
      <CreateNewTask
        showPane={showNewTaskPane}
        setShowPane={setShowNewTaskPane}
        createNewTask={createNewTask}
      />
    </>
  );
};

export default Tasks;
