const zod = require("zod");

const schema = zod.object({
  email: zod.string().email(),
  password: zod.string().min(8),
});
const validateInput = (obj) => {
  const response = schema.safeParse(obj);
  console.log(response);
};

validateInput({
  email: "onlyrishavmishra@gmail.com",
  password: "wedwef",
});
