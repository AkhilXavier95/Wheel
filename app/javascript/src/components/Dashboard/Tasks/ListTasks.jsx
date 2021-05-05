import React from "react";
import moment from "moment";

import { Badge, Checkbox, Tooltip } from "neetoui";

import editIcon from "images/editIcon";
import deleteIcon from "images/deleteIcon";

import { badgeColor } from "../constant";

const ListTasks = ({
  taskList,
  selectedIds,
  onSelectAll,
  onSelectTask,
  editClickAction,
  deleteClickAction,
}) => {
  const actionButton = (icon, handleClick, action) => (
    <Tooltip content={action} position="bottom">
      <div className="mx-1" onClick={handleClick}>
        <img src={icon} />
      </div>
    </Tooltip>
  );

  return (
    <div className="w-full px-28">
      <table className="nui-table nui-table--actions">
        <thead>
          <tr>
            <th>
              <Checkbox
                checked={selectedIds.length === taskList.length ? true : false}
                onChange={onSelectAll}
              />
            </th>
            <th className="text-left text-gray-400">TITLE</th>
            <th className="text-left text-gray-400">DESCRIPTION</th>
            <th className="text-left text-gray-400">TAGS</th>
            <th className="text-left text-gray-400">CREATED DATE</th>
            <th className="text-center text-gray-400">DUE DATE</th>
          </tr>
        </thead>
        <tbody>
          {taskList.map(task => (
            <tr
              key={task.id}
              className="cursor-pointer bg-white hover:bg-gray-50 text-sm"
            >
              <td>
                <Checkbox
                  checked={selectedIds.indexOf(task.id) > -1}
                  onChange={e => onSelectTask(e, task.id)}
                />
              </td>
              <td>
                <div className="flex flex-row items-center justify-start text-purple-500">
                  {task.title}
                </div>
              </td>
              <td>{task.description}</td>
              <td>
                <div className="text-center">
                  <Badge color={badgeColor[task.tag]}>{task.tag}</Badge>
                </div>
              </td>
              <td>{moment(task.createdDate).format("MMM D, YYYY")}</td>
              <td>
                <div className="text-center">
                  {task.dueDate
                    ? moment(task.dueDate).format("MMM D, YYYY")
                    : "--"}
                </div>
              </td>
              <td>
                <div className="flex">
                  {actionButton(editIcon, editClickAction, "Edit")}
                  {actionButton(deleteIcon, deleteClickAction, "Delete")}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListTasks;
