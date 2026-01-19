import API from "./axios";

export const sendSkillRequest = async (skillId) => {
  const res = await API.post("/requests", { skillId });
  return res.data;
};

export const getMyRequests = async () => {
  const res = await API.get("/requests/my");
  return res.data;
};

export const updateRequestStatus = async (id, status) => {
  const res = await API.patch(`/requests/${id}`, { status });
  return res.data;
};

export const getMySentRequests = async () => {
  const res = await API.get("/requests/sent");
  return res.data;
};

