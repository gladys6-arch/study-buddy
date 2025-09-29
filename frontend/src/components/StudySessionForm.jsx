import { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { createStudySession, getStudents, getSubjects, getTutors } from "../api/api";

const validationSchema = Yup.object({
  duration_minutes: Yup.number().positive("Must be positive").required("Duration required"),
  notes: Yup.string().max(500, "Too long")
});

export default function StudySessionForm({ onSuccess }) {
  const [students, setStudents] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [studentsData, subjectsData, tutorsData] = await Promise.all([
        getStudents(),
        getSubjects(),
        getTutors()
      ]);
      setStudents(studentsData);
      setSubjects(subjectsData);
      setTutors(tutorsData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSubmit = async (values, { resetForm }) => {
    setLoading(true);
    try {
      await createStudySession({
        duration_minutes: values.duration_minutes,
        notes: values.notes,
        student_id: values.student_id || null,
        subject_id: values.subject_id || null,
        tutor_id: values.tutor_id || null,
      });
      resetForm();
      if (onSuccess) onSuccess(); 
    } catch (error) {
      console.error("Error creating study session:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Formik
      initialValues={{
        student_id: "",
        subject_id: "",
        tutor_id: "",
        duration_minutes: "",
        notes: ""
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form className="bg-white shadow-lg rounded-xl p-4 sm:p-6 space-y-4 mx-4 sm:mx-0">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">Create Study Session</h2>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Student (optional)</label>
          <Field as="select" name="student_id" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-400 outline-none">
            <option value="">Select a student...</option>
            {students.map((student) => (
              <option key={student.id} value={student.id}>
                {student.name}
              </option>
            ))}
          </Field>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Subject (optional)</label>
          <Field as="select" name="subject_id" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-400 outline-none">
            <option value="">Select a subject...</option>
            {subjects.map((subject) => (
              <option key={subject.id} value={subject.id}>
                {subject.name}
              </option>
            ))}
          </Field>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Tutor (optional)</label>
          <Field as="select" name="tutor_id" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-400 outline-none">
            <option value="">Select a tutor...</option>
            {tutors.map((tutor) => (
              <option key={tutor.id} value={tutor.id}>
                {tutor.name}
              </option>
            ))}
          </Field>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Duration (minutes)</label>
          <Field
            type="number"
            name="duration_minutes"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-400 outline-none"
            placeholder="e.g. 60"
          />
          <ErrorMessage name="duration_minutes" component="div" className="text-red-500 text-sm mt-1" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Notes (optional)</label>
          <Field
            as="textarea"
            name="notes"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-400 outline-none"
            placeholder="Any details about this session..."
            rows="3"
          />
          <ErrorMessage name="notes" component="div" className="text-red-500 text-sm mt-1" />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full sm:w-auto bg-orange-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-orange-600 transition-colors duration-200 disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create Session"}
        </button>
      </Form>
    </Formik>
  );
}