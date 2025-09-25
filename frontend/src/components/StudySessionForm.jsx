import { Formik, Form, Field } from "formik";
import { createStudySession } from "../api/api";

export default function StudySessionForm({ onSuccess }) {
  return (
    <Formik
      initialValues={{ studentId: "", subjectId: "", tutorId: "", date: "" }}
      onSubmit={async (values, { resetForm }) => {
        await createStudySession(values);
        resetForm();
        if (onSuccess) onSuccess();
      }}
    >
      <Form className="flex gap-3 mb-4 flex-wrap">
        <Field
          name="studentId"
          placeholder="Student ID"
          className="border p-2 rounded"
        />
        <Field
          name="subjectId"
          placeholder="Subject ID"
          className="border p-2 rounded"
        />
        <Field
          name="tutorId"
          placeholder="Tutor ID"
          className="border p-2 rounded"
        />
        <Field
          name="date"
          type="date"
          className="border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-purple-600 text-white px-4 rounded hover:bg-purple-700"
        >
          Add
        </button>
      </Form>
    </Formik>
  );
}
