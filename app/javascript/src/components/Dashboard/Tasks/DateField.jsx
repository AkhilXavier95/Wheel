import React from "react";
import { Field } from "formik";

import { DateInput } from "neetoui";

const DateField = ({ name, ...rest }) => (
  <Field name={name}>
    {({ field, form: { errors, setFieldValue } }) => (
      <>
        <DateInput
          name={name}
          value={field.value}
          onChange={value => setFieldValue(field.name, value)}
          {...rest}
        />
        {errors[field.name] && (
          <p className="mt-1 text-xs text-red-500">{errors[field.name]}</p>
        )}
      </>
    )}
  </Field>
);

export default DateField;
