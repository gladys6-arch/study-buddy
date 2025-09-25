import { Formik, Form, Field } from "formik";
import { createStudent } from "../api/api";

export default function StudentForm({ onSuccess }) {
  return (
    <Formik
      initialValues={{ name: "", email: "" }}
      onSubmit={async (values, { resetForm }) => {
        await createStudent(values);
        resetForm();
        if (onSuccess) onSuccess();
      }}
    >
      <Form className="flex gap-3 mb-4">
        <Field
          name="name"
          placeholder="Student name"
          className="border p-2 rounded"
        />
        <Field
          name="email"
          type="email"
          placeholder="Student email"
          className="border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 rounded hover:bg-green-700"
        >
          Add
        </button>
      </Form>
    </Formik>
  );
}
