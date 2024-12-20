import jwt from "jsonwebtoken";

const decodeToken = (token) => {
  const parsedToken = token.split(" ")[1];
  try {
    const decoded = jwt.verify(parsedToken, process.env.SECRET_WORD);
    return decoded;
  } catch (e) {
    console.error("Wrong token");
    return null;
  }
};

export { decodeToken };
