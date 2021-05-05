import React from "react";
import { Modal } from "neetoui";

export default function DeleteAlert({ onClose, handleDelete }) {
  return (
    <Modal
      isOpen
      size="small"
      autoHeight
      showFooter
      submitButtonProps={{
        style: "danger",
        label: "Continue anyway",
        loading: false,
        onClick: handleDelete,
      }}
      onClose={onClose}
    >
      <div className="flex">
        <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 bg-red-100 rounded-full">
          <i className="text-red-500 ri-alarm-warning-fill ri-lg"></i>
        </div>

        <div className="ml-4">
          <h3 className="mb-2 text-lg font-medium text-gray-700">
            Delete Task
          </h3>
          <div className="text-sm leading-5 text-gray-500">
            Are you sure you want to delete the Task? All of your data will be
            permanently removed from our database forever. This action cannot be
            undone.
          </div>
        </div>
      </div>
    </Modal>
  );
}
