import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { Button } from 'reactstrap'

const initialValues = {
  courseThambnail: "",
  courseTitle: "",
  courseDesc: "",
  courseCategory: "",
  courseTags: "",
  languages: "",
};

const PersonalInfoSchema = Yup.object().shape({
  courseThambnail: Yup.string().required("Upload course thumbnail"),
  courseTitle: Yup.string().required("Course Title is required"),
  courseDesc: Yup.string().required("Course Description is required"),
  courseCategory: Yup.string().required("Course selection is required"),
  courseTags: Yup.string().required("Course tags are required"),
  languages: Yup.string().required("Languages are required"),
});

function UploadCourse() {
  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={PersonalInfoSchema}
        onSubmit={(fields) => {
          alert(
            "SUCCESS!! :-)\n\n" + JSON.stringify(fields, null, 4)
          );
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <div className="row mb-20">
              <label className="form-label col-lg-3">Course Thumbnail</label>
              <div className="col-lg-9">
                <Field
                  name="courseThambnail"
                  type="file"
                  className={
                    "form-control col-lg-9" +
                    (errors.courseThambnail && touched.courseThambnail
                      ? " is-invalid"
                      : "")
                  }
                />
                <ErrorMessage
                  name="courseThambnail"
                  component="div"
                  className="invalid-feedback"
                />
              </div>
            </div>
            <div className="row mb-20">
              <label className="form-label col-lg-3">Course Title</label>
              <div className="col-lg-9">
                <Field
                  name="courseTitle"
                  type="text"
                  className={
                    "form-control col-lg-9" +
                    (errors.courseTitle && touched.courseTitle
                      ? " is-invalid"
                      : "")
                  }
                />
                <ErrorMessage
                  name="courseTitle"
                  component="div"
                  className="invalid-feedback"
                />
              </div>
            </div>
            <div className="row mb-20">
  <label className="form-label col-lg-3">Course Description</label>
  <div className="col-lg-9">
    <Field
      name="courseDesc"
      as="textarea"  // Use textarea instead of input
      rows="12"  // Set the number of rows
      className={
        "form-control col-lg-9" +
        (errors.courseDesc && touched.courseDesc
          ? " is-invalid"
          : "")
      }
    />
    <ErrorMessage
      name="courseDesc"
      component="div"
      className="invalid-feedback"
    />
  </div>
</div>

            <div className="row mb-20">
              <label className="form-label col-lg-3">Course Category</label>
              <div className="col-lg-9">
                <Field
                  name="courseCategory"
                  as="select"
                  className={
                    "form-control col-lg-9" +
                    (errors.courseCategory && touched.courseCategory
                      ? " is-invalid"
                      : "")
                  }
                >
                  <option>Select a category</option>
                  <option value="Bootstrap Learning">Bootstrap Learning</option>
                  <option value="React JS">React JS</option>
                  <option value="Laravel Framework">Laravel Framework</option>
                </Field>
                <ErrorMessage
                  name="courseCategory"
                  component="div"
                  className="invalid-feedback"
                />
              </div>
            </div>
            <div className="row mb-20">
              <label className="form-label col-lg-3">Course Tags</label>
              <div className="col-lg-9">
                <Field
                  name="courseTags"
                  type="text"
                  className={
                    "form-control col-lg-9" +
                    (errors.courseTags && touched.courseTags
                      ? " is-invalid"
                      : "")
                  }
                />
                <ErrorMessage
                  name="courseTags"
                  component="div"
                  className="invalid-feedback"
                />
              </div>
            </div>
            <div className="row mb-20">
  <label className="form-label col-lg-3">Languages</label>
  <div className="col-lg-9">
    <Field
      name="languages"
      as="select"  // Use select element for dropdown
      className={
        "form-control col-lg-9" +
        (errors.languages && touched.languages
          ? " is-invalid"
          : "")
      }
    >
      <option value="">Select a language</option>
      <option value="English">English</option>
      <option value="Spanish">Spanish</option>
      <option value="French">French</option>
      {/* Add more language options as needed */}
    </Field>
    <ErrorMessage
      name="languages"
      component="div"
      className="invalid-feedback"
    />
  </div>
</div>
            <div className="row mt-16">
              <div className="col-lg-3"></div>
              <div className="col-lg-9">
                <Button color="primary" className="me-10">Next Step</Button>{' '}
                <Button color="danger">Cancel</Button>{' '}
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default UploadCourse;