import { Field, Form, Formik } from "formik"
import { useCreatePostMutation } from "../hooks/use-create-post.mutation.hook"

const CreatePost = () => {
  const { mutate: createPost } = useCreatePostMutation()

  return (
    <section className="mb-8 w-full">
      <h2 className="text-xl font-semibold mb-2">Create Post</h2>
      <Formik
        initialValues={{ content: '' }}
        onSubmit={(values, { resetForm }) => {
          createPost(values.content, {
            onSuccess: () => resetForm(),
          })
        }}
      >
        {({ errors, touched }) => (
          <Form className="flex flex-col space-y-2">
            <Field
              name="content"
              as="textarea"
              className="border rounded-md p-2 resize-none"
              placeholder="What's on your mind?"
              rows={3}
            />
            {errors.content && touched.content && (
              <div className="text-red-500 text-sm">{errors.content}</div>
            )}
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
            >
              Post
            </button>
          </Form>
        )}
      </Formik>
    </section>
  )
}

export default CreatePost
