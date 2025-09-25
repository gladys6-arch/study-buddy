import { Formik, Form, Field } from "formik";
import { createSubject } from "../api/api";

export default function SubjectForm({ onSuccess }) {
  return (
    <Formik
      initialValues={{ name: "" }}
      onSubmit={async (values, { resetForm }) => {
        await createSubject(values);
        resetForm();
        if (onSuccess) onSuccess();
      }}
    >
      <Form className="bg-white shadow-md rounded-lg p-6 w-full max-w-md mx-auto flex gap-3 items-center">
        <Field
          name="name"
          placeholder="Enter subject name"
          className="flex-1 border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-sm"
        >
          Add
        </button>
      </Form>
    </Formik>
  );
}
