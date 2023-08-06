const defaultValues = {
  emailAddress: "",
  firstName: "",
  lastName: "",
  phone: "",
  password: "",
};

const validate = (obj) => {
  const { id, ...objWithoutId } = obj;
  return Object.values(objWithoutId).some((value) => value === "");
};

const getFields = (user, isLogin) => {
  const fields = [
    {
      label: "Email",
      name: "emailAddress",
      value: user.email,
      required: true,
      autoFocus: true,
    },
    {
      label: "Nombre",
      name: "firstName",
      required: true,
      value: user.name,
    },
    {
      label: "Apellido",
      name: "lastName",
      required: true,
      value: user.lastName,
    },
    {
      label: "Telefono",
      type: "number",
      name: "phone",
      required: true,
      value: user.phone,
    },
    {
      label: "Contraseña",
      name: "password",
      type: "password",
      value: user.password,
      required: true,
    },
  ];

  if (isLogin) {
    const password = fields.pop();
    const email = fields.shift();

    return [email, password];
  } else {
    return fields;
  }
};

export { defaultValues, getFields, validate };
