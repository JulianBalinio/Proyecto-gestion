const validate = (obj) => {
  const { id, ...objWithoutId } = obj;
  return Object.values(objWithoutId).some((value) => value === "");
};

const getFields = (user) => {
  const fields = [
    {
      label: "Email",
      name: "emailAddress",
      value: user.email,
      required: true,
      placeholder: "Email",
      inputLabelProps: {
        shrink: true,
      },
    },
    {
      label: "Contraseña",
      name: "password",
      type: "password",
      value: user.password,
      placeholder: "Contraseña",
      required: true,
      inputLabelProps: {
        shrink: true,
      },
    },
  ];

  return fields;
};

export { getFields, validate };
