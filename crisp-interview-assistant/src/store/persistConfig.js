import storage from "redux-persist/lib/storage";

export default {
  key: "crisp-interview",
  version: 1,
  storage,
  whitelist: ["candidates", "interview", "ui"],
};
