import React from "react";
import { Alert } from "neetoui";

export default function DeleteAlert({ onClose, handleDelete }) {
  return (
    <Alert
      isOpen
      title="Delete Task"
      message="Are you sure you want to delete the task?"
      icon="text-red-500 ri-alarm-warning-fill ri-lg"
      onClose={onClose}
      hideConfirmation
      cancelButtonProps={{
        onClick: onClose,
      }}
      submitButtonProps={{
        onClick: handleDelete,
      }}
    />
  );
}
