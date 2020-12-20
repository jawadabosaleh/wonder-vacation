const isEmail = (string) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(string);
};

export const email = (value) => {
  return value && !isEmail(value.trim()) ? "Invalid email" : null;
};

const isDirty = (value) => {
  return value || value === 0;
};

export const required = (requiredFields, values) => {
  return requiredFields.reduce(
    (fields, field) => ({
      ...fields,
      ...(isDirty(values[field]) ? undefined : { [field]: "Required" }),
    }),
    {}
  );
};

export default email;
