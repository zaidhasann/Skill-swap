import API from "./axios";

/* ================= GET MY CONTRACTS ================= */
// GET /api/contracts/my
export const getMyContracts = async () => {
  const res = await API.get("/contracts/my");
  return res.data;
};

/* ================= COMPLETE CONTRACT ================= */
// PATCH /api/contracts/:id/complete
export const completeContract = async (id) => {
  const res = await API.patch(`/contracts/${id}/complete`);
  return res.data;
};

/* ================= REQUEST COMPLETION ================= */
// PATCH /api/contracts/:id/request-completion
export const requestCompletion = async (id) => {
  const res = await API.patch(`/contracts/${id}/request-completion`);
  return res.data;
};

/* ================= CANCEL CONTRACT ================= */
// PATCH /api/contracts/:id/cancel
export const cancelContract = async (id) => {
  const res = await API.patch(`/contracts/${id}/cancel`);
  return res.data;
};
