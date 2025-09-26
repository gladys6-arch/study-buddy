import axios from "axios";

const BASE_URL = "http://localhost:5000/api"; 

// ---------- Students ----------
export const getStudents = async () => {
  const res = await axios.get(`${BASE_URL}/students`);
  return res.data;
};

export const createStudent = async (student) => {
  const res = await axios.post(`${BASE_URL}/students`, student);
  return res.data;
};

export const deleteStudent = async (id) => {
  return axios.delete(`${BASE_URL}/students/${id}`);
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
  const res = await axios.get(`${BASE_URL}/study-sessions`);
  return res.data;
};

export const createStudySession = async (session) => {
  const res = await axios.post(`${BASE_URL}/study-sessions`, session);
  return res.data;
};
