import axios from "axios";

const BASE_URL = "http://localhost:5000/api"; // 👈 change if your backend uses another port/path

// ---------- Students ----------
export const getStudents = async () => {
  const res = await axios.get(`${BASE_URL}/students`);
  return res.data;
};

export const createStudent = async (student) => {
  const res = await axios.post(`${BASE_URL}/students`, student);
  return res.data;
};

// ---------- Subjects ----------
export const getSubjects = async () => {
  const res = await axios.get(`${BASE_URL}/subjects`);
  return res.data;
};

export const createSubject = async (subject) => {
  const res = await axios.post(`${BASE_URL}/subjects`, subject);
  return res.data;
};

// ---------- Tutors ----------
export const getTutors = async () => {
  const res = await axios.get(`${BASE_URL}/tutors`);
  return res.data;
};

export const createTutor = async (tutor) => {
  const res = await axios.post(`${BASE_URL}/tutors`, tutor);
  return res.data;
};

// ---------- Study Sessions ----------
export const getStudySessions = async () => {
  const res = await axios.get(`${BASE_URL}/sessions`);
  return res.data;
};

export const createStudySession = async (session) => {
  const res = await axios.post(`${BASE_URL}/sessions`, session);
  return res.data;
};
