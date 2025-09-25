import { Formik, Form, Field } from "formik";
import { createTutor } from "../api/api";

export default function TutorForm({ onSuccess }) {
  return (
    <Formik
      initialValues={{ name: "", email: "" }}
      onSubmit={async (values, { resetForm }) => {
        await createTutor(values);
        resetForm();
        if (onSuccess) onSuccess();
      }}
    >
      <Form className="flex gap-3 mb-4">
        <Field
          name="name"
          placeholder="Tutor name"
          className="border p-2 rounded"
        />
        <Field
          name="email"
          type="email"
          placeholder="Tutor email"
          className="border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 rounded"
        >
          Add
        </button>
      </Form>
    </Formik>
  );
}
