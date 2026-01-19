import API from "./axios";

/* ================= GET ALL SKILLS (WITH SEARCH) ================= */
export const getSkills = async (search = "") => {
  const res = await API.get(`/skills?search=${search}`);
  return res.data;
};

/* ================= GET LOGGED-IN USER SKILLS ================= */
export const getMySkills = async () => {
  const res = await API.get("/skills/my");
  return res.data;
};

/* ================= POST SKILL ================= */
export const postSkill = async (skill) => {
  const res = await API.post("/skills", skill);
  return res.data;
};

/* ================= DELETE SKILL ================= */
export const deleteSkill = async (id) => {
  const res = await API.delete(`/skills/${id}`);
  return res.data;
};
