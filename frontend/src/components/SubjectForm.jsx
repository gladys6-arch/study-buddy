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
      <Form className="flex gap-3 mb-4">
        <Field
          name="name"
          placeholder="Subject name"
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
