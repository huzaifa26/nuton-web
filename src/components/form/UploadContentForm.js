import React, { useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { Button, Row, Col } from "reactstrap";


const initialValues = {
  courseTitle: "",
  courseDesc: "",
  sections: [{ title: "", video: "", description: "" }],
};

const PersonalInfoSchema = Yup.object().shape({
  courseTitle: Yup.string().required("Course Title is required"),
  courseDesc: Yup.string().required("Course Description is required"),
  sections: Yup.array().of(
    Yup.object().shape({
      title: Yup.string().required("Title is required"),
      video: Yup.string().required("Video is required"),
      description: Yup.string().required("Description is required"),
    })
  ),
});

function UploadCourse() {
  const [sections, setSections] = useState([
    { title: "", video: "", description: "" },
  ]);

  const addSection = () => {
    setSections([...sections, { title: "", video: "", description: "" }]);
  };

  const deleteSection = (index) => {
    const updatedSections = [...sections];
    updatedSections.splice(index, 1);
    setSections(updatedSections);
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={PersonalInfoSchema}
        onSubmit={(fields) => {
          alert("SUCCESS!! :-)\n\n" + JSON.stringify(fields, null, 4));
        }}
      >
        {({ errors, touched }) => (
          <Form>
            {sections.map((section, index) => (
              <div key={index} className="section-container">
                <Row className="mb-20">
                  <Col lg="3">
                    <label className="form-label">Topic of this section:</label>
                  </Col>
                  <Col lg="9">
                    <Field
                      name={`sections[${index}].title`}
                      type="text"
                      className={
                        "form-control" +
                        (errors.sections?.[index]?.title &&
                        touched.sections?.[index]?.title
                          ? " is-invalid"
                          : "")
                      }
                    />
                    <ErrorMessage
                      name={`sections[${index}].title`}
                      component="div"
                      className="invalid-feedback"
                    />
                  </Col>
                </Row>
                <Row className="mb-20">
                  <Col lg="3">
                    <label className="form-label">Video Upload</label>
                  </Col>
                  <Col lg="9">
                    <Field
                      name={`sections[${index}].video`}
                      type="file"
                      className={
                        "form-control" +
                        (errors.sections?.[index]?.video &&
                        touched.sections?.[index]?.video
                          ? " is-invalid"
                          : "")
                      }
                    />
                    <ErrorMessage
                      name={`sections[${index}].video`}
                      component="div"
                      className="invalid-feedback"
                    />
                  </Col>
                </Row>
                <Row className="mb-20">
                  <Col lg="3">
                    <label className="form-label">Notification for this section:</label>
                  </Col>
                  <Col lg="9">
                    <Field
                      name={`sections[${index}].description`}
                      as="textarea"
                      rows="4"
                      className={
                        "form-control" +
                        (errors.sections?.[index]?.description &&
                        touched.sections?.[index]?.description
                          ? " is-invalid"
                          : "")
                      }
                    />
                    <ErrorMessage
                      name={`sections[${index}].description`}
                      component="div"
                      className="invalid-feedback"
                    />
                  </Col>
                </Row>
                <div className="section-button-row">
                  <Button color="danger" onClick={() => deleteSection(index)}>
                    <i className="bi bi-trash"></i> Delete
                  </Button>
                </div>
              </div>
            ))}
            <div className="section-button-row">
              <Button color="primary" className="add-button" onClick={addSection}>
                +
              </Button>
            </div>
            <div className="button-row mt-16">
              <Button color="secondary" className="me-10">
                Previous
              </Button>
              <Button color="primary" type="submit">
                Next Step
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}


export default UploadCourse;