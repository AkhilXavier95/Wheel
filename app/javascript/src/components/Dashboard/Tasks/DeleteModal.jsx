import React from "react";
import { Alert } from "neetoui";

export default function DeleteAlert({ onClose, handleDelete }) {
  return (
    <Alert
      isOpen
      title="Delete Task"
      onClose={onClose}
      cancelButtonProps={{
        onClick: onClose,
      }}
      submitButtonProps={{
        onClick: handleDelete,
      }}
    />
  );
}
