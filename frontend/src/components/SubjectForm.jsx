import { Formik, Form, Field, ErrorMessage } from "formik";
import { createStudent } from "../api/api";

export default function StudentForm({ onSuccess }) {
  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-2xl p-6 border border-gray-100">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Add New Student
      </h2>

      <Formik
        initialValues={{ name: "", email: "" }}
        onSubmit={async (values, { resetForm }) => {
          await createStudent(values);
          resetForm();
          if (onSuccess) onSuccess();
        }}
      >
        <Form className="space-y-4">
          {/* Name Field */}
          <div>
            <Field
              name="name"
              placeholder="Student name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                         focus:ring-2 focus:ring-green-500 focus:border-green-500 
                         outline-none transition duration-200"
            />
            <ErrorMessage
              name="name"
              component="div"
              className="text-sm text-red-500 mt-1"
            />
          </div>

          {/* Email Field */}
          <div>
            <Field
              name="email"
              type="email"
              placeholder="Student email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                         focus:ring-2 focus:ring-green-500 focus:border-green-500 
                         outline-none transition duration-200"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="text-sm text-red-500 mt-1"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg 
                       hover:bg-green-700 focus:ring-2 focus:ring-green-400 
                       focus:outline-none transition duration-200 font-medium shadow"
          >
            Add Student
          </button>
        </Form>
      </Formik>
    </div>
  );
}