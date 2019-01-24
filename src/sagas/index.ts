
import * as api from "./api";

export default [
  ...Object.values(api).filter((fn) => typeof fn === "function"),
];
