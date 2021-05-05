import React, { useState, useEffect } from "react";

import { Button, PageLoader } from "neetoui";
import { PageHeading, SubHeader } from "neetoui/layouts";

// import notesApi from "apis/notes";
import EmptyState from "components/Common/EmptyState";
import EmptyTaskList from "images/EmptyTaskList";

import ListTasks from "./ListTasks";
import UserDropDown from "./UserDropDown";

const initialTasks = [
  {
    id: 1,
    title: "task1",
    description: "task1 description",
    tag: "Internal",
    createdDate: new Date(),
    dueDate: new Date(),
  },
  {
    id: 2,
    title: "task2",
    description: "task2 description",
    tag: "Bug",
    createdDate: new Date(),
    dueDate: new Date(),
  },
  {
    id: 3,
    title: "task3",
    description: "task3 description",
    tag: "Workflow",
    createdDate: new Date(),
  },
  {
    id: 4,
    title: "task4",
    description: "task3 description",
    tag: "Internal",
    createdDate: new Date(),
    dueDate: new Date(),
  },
];

const Tasks = () => {
  const [loading, setLoading] = useState(true);
  const [taskList, setTaskList] = useState(initialTasks);
  const [selectedIds, setSelectedIds] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      // const response = await notesApi.fetch();
      setTaskList(initialTasks);
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
              onClick={() => {}}
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
    </>
  );
};

export default Tasks;
