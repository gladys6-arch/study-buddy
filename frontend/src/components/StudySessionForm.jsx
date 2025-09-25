import { Formik, Form, Field, ErrorMessage } from "formik";
import { createStudySession } from "../api/api";

export default function StudySessionForm({ onSuccess }) {
  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-2xl p-6 border border-gray-100">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Schedule Study Session
      </h2>

      <Formik
        initialValues={{ studentId: "", subjectId: "", tutorId: "", date: "" }}
        onSubmit={async (values, { resetForm }) => {
          await createStudySession(values);
          resetForm();
          if (onSuccess) onSuccess();
        }}
      >
        <Form className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          <div>
            <Field
              name="studentId"
              placeholder="Student ID"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                         focus:ring-2 focus:ring-purple-500 focus:border-purple-500 
                         outline-none transition duration-200"
            />
            <ErrorMessage
              name="studentId"
              component="div"
              className="text-sm text-red-500 mt-1"
            />
          </div>

          
          <div>
            <Field
              name="subjectId"
              placeholder="Subject ID"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                         focus:ring-2 focus:ring-purple-500 focus:border-purple-500 
                         outline-none transition duration-200"
            />
            <ErrorMessage
              name="subjectId"
              component="div"
              className="text-sm text-red-500 mt-1"
            />
          </div>

          
          <div>
            <Field
              name="tutorId"
              placeholder="Tutor ID"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                         focus:ring-2 focus:ring-purple-500 focus:border-purple-500 
                         outline-none transition duration-200"
            />
            <ErrorMessage
              name="tutorId"
              component="div"
              className="text-sm text-red-500 mt-1"
            />
          </div>

          
          <div>
            <Field
              name="date"
              type="date"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                         focus:ring-2 focus:ring-purple-500 focus:border-purple-500 
                         outline-none transition duration-200"
            />
            <ErrorMessage
              name="date"
              component="div"
              className="text-sm text-red-500 mt-1"
            />
          </div>

          
          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-2 rounded-lg 
                         hover:bg-purple-700 focus:ring-2 focus:ring-purple-400 
                         focus:outline-none transition duration-200 font-medium shadow"
            >
              Add Session
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}
