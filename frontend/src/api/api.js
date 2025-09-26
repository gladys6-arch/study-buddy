import axios from "axios";

const BASE_URL = "http://localhost:5000/api"; 

// ---------- Students ----------
export const getStudents = async () => {
  const res = await axios.get(`${BASE_URL}/students/`);
  return res.data;
};

export const createStudent = async (student) => {
  const res = await axios.post(`${BASE_URL}/students/`, student);
  return res.data;
};

export const deleteStudent = async (id) => {
  return axios.delete(`${BASE_URL}/students/${id}`);
};

export const updateStudent = async (id, student) => {
  const res = await axios.put(`${BASE_URL}/students/${id}`, student);
  return res.data;
};

// ---------- Subjects ----------
export const getSubjects = async () => {
  const res = await axios.get(`${BASE_URL}/subjects/`);
  return res.data;
};

export const createSubject = async (subject) => {
  const res = await axios.post(`${BASE_URL}/subjects/`, subject);
  return res.data;
};

export const deleteSubject = async (id) => {
  return axios.delete(`${BASE_URL}/subjects/${id}`);
};

export const updateSubject = async (id, subject) => {
  const res = await axios.put(`${BASE_URL}/subjects/${id}`, subject);
  return res.data;
};

// ---------- Tutors ----------
export const getTutors = async () => {
  const res = await axios.get(`${BASE_URL}/tutors/`);
  return res.data;
};

export const createTutor = async (tutor) => {
  const res = await axios.post(`${BASE_URL}/tutors/`, tutor);
  return res.data;
};

export const deleteTutor = async (id) => {
  return axios.delete(`${BASE_URL}/tutors/${id}`);
};

export const updateTutor = async (id, tutor) => {
  const res = await axios.put(`${BASE_URL}/tutors/${id}`, tutor);
  return res.data;
};

// ---------- Study Sessions ----------
export const getStudySessions = async () => {
  const res = await axios.get(`${BASE_URL}/study-sessions/`);
  return res.data;
};

export const createStudySession = async (session) => {
  const res = await axios.post(`${BASE_URL}/study-sessions/`, session);
  return res.data;
};

export const deleteStudySession = async (id) => {
  return axios.delete(`${BASE_URL}/study-sessions/${id}`);
};

export const updateStudySession = async (id, session) => {
  const res = await axios.put(`${BASE_URL}/study-sessions/${id}`, session);
  return res.data;
};
