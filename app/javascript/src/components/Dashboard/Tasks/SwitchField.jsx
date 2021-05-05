import React from "react";
import { Field } from "formik";
import { Switch } from "neetoui";

const SwitchField = ({ name }) => (
  <Field name={name}>
    {({ field, form: { errors, setFieldValue } }) => (
      <Switch
        name={name}
        error={errors[field.name]}
        checked={field.value}
        onChange={() => setFieldValue("showDueDate", !field.value)}
      />
    )}
  </Field>
);

export default SwitchField;
