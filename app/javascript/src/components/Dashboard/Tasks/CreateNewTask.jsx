import React from "react";
import { Formik, Form } from "formik";
import * as yup from "yup";

import { Pane, Button } from "neetoui";
import { Input, Textarea, Select } from "neetoui/formik";

import SwitchField from "./SwitchField";
import DateField from "./DateField";

const validationSchema = yup.object({
  showDueDate: yup.boolean(),
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  dueDate: yup.date().when("showDueDate", {
    is: true,
    then: yup.date().required("Date is required").nullable(),
    otherwise: yup.date().nullable(),
  }),
});

const CreateNewTask = ({ showPane, setShowPane, createNewTask }) => {
  const onClose = () => setShowPane(false);
  const handleSubmit = values => {
    createNewTask(values);
  };
  return (
    <Pane title="Create a new Task" isOpen={showPane} onClose={onClose}>
      <div className="px-6">
        <Formik
          initialValues={{
            title: "",
            description: "",
            tags: { label: "Internal", value: "Internal" },
            showDueDate: false,
            dueDate: new Date(),
          }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          {({ values }) => (
            <Form>
              <Input label="Task title" name="title" className="mb-3" />
              <Select
                label="Tags"
                name="tags"
                className="mb-3"
                options={[
                  { label: "Internal", value: "Internal" },
                  { label: "Bug", value: "Bug" },
                  { label: "Workflow", value: "Workflow" },
                ]}
              />
              <Textarea
                label="Task description"
                name="description"
                className="mb-3"
              />
              <div className="flex justify-between items-center mb-2">
                <span>Add Due Date to Note</span>
                <SwitchField name="showDueDate" />
              </div>
              {values.showDueDate && (
                <DateField
                  name="dueDate"
                  label="Due Date"
                  minDate={new Date()}
                />
              )}
              <div className="nui-pane__footer nui-pane__footer--absolute">
                <Button
                  onClick={onClose}
                  label="Cancel"
                  size="large"
                  style="secondary"
                />

                <Button
                  type="submit"
                  label="Save Changes"
                  size="large"
                  style="primary"
                  className="ml-2"
                />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </Pane>
  );
};

export default CreateNewTask;
