import API from "./axios";

/* ================= SEND SKILL REQUEST ================= */
export const sendSkillRequest = async (skillId) => {
  const res = await API.post("/requests", { skillId });
  return res.data;
};

/* ================= INCOMING REQUESTS (OWNER) ================= */
export const getMyRequests = async () => {
  const res = await API.get("/requests/my");
  return res.data;
};

/* ================= SENT REQUESTS (REQUESTER) ================= */
export const getMySentRequests = async () => {
  const res = await API.get("/requests/sent");
  return res.data;
};

/* ================= ACCEPT / REJECT REQUEST ================= */
export const updateRequestStatus = async (id, status) => {
  const res = await API.patch(`/requests/${id}`, { status });
  return res.data;
};

/* ================= GET REQUEST BY ID (CHAT AUTH) ================= */
export const getRequestById = async (id) => {
  const res = await API.get(`/requests/${id}`);
  return res.data;
};
