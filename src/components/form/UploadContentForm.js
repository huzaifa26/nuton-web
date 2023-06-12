import React, { useEffect, useRef, useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { Button, Row, Col } from "reactstrap";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { newCourse } from "@/redux/reducers/courseSlice";

const PersonalInfoSchema = Yup.object().shape({
  sections: Yup.array().of(
    Yup.object().shape({
      title: Yup.string().required("Title is required"),
      video: Yup.string().required("Video is required"),
      description: Yup.string().required("Description is required"),
      questions: Yup.array().of(
        Yup.object().shape({
          question: Yup.string().required("Question is required"),
          answer: Yup.string().required("Answer is required"),
        })
      ),
    })
  ),
});

function UploadCourse() {
  const router = useRouter();
  const dispatch = useDispatch();
  const courseData = useSelector((state) => state.course.newCourse);
  const initialValues = {
    sections: courseData?.sections[courseData.index]?.topics || [
      {
        title: "",
        video: "",
        description: "",
        questions: [],
      },
    ],
  };

  const [sections, setSections] = useState(
    courseData?.sections[courseData.index]?.topics || [
      {
        title: "",
        video: "",
        description: "",
        questions: [],
      },
    ]
  );

  const addSection = () => {
    setSections([
      ...sections,
      {
        title: "",
        video: "",
        description: "",
        questions: [],
      },
    ]);
  };

  const deleteSection = (sectionIndex) => {
    const updatedSections = [...sections];
    updatedSections.splice(sectionIndex, 1);
    setSections(updatedSections);
  };

  const addQuestion = (sectionIndex) => {
    const numQuestions = parseInt(
      prompt("Enter the number of questions you want to add:")
    );
    if (!isNaN(numQuestions)) {
      const updatedSections = [...sections];
      updatedSections[sectionIndex].questions = Array(numQuestions).fill({
        question: "",
        answer: "",
      });
      setSections(updatedSections);
    }
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={PersonalInfoSchema}
        enableReinitialize={true}
        onSubmit={(fields) => {
          let data = { ...courseData };
          const topics = fields.sections.map((section, index) => ({
            ...section,
          }));
          const section = {
            ...data.sections[data.index],
            topics: topics,
          };
          data.sections = data.sections.map((sec, index) => {
            if (index === data.index) {
              return section;
            }
            return sec;
          });
          console.log(data);
          dispatch(newCourse(data));
          router.push({ pathname: "/uploadlessons" });
        }}
      >
        {({ errors, touched }) => (
          <Form>
            {sections.map((section, sectionIndex) => (
              <div key={sectionIndex} className="section-container">
                <Row className="mb-20">
                  <Col lg="3">
                    <label className="form-label">Topic of this section:</label>
                  </Col>
                  <Col lg="9">
                    <Field
                      name={`sections[${sectionIndex}].title`}
                      type="text"
                      className={
                        "form-control" +
                        (errors.sections?.[sectionIndex]?.title &&
                          touched.sections?.[sectionIndex]?.title
                          ? " is-invalid"
                          : "")
                      }
                    />
                    <ErrorMessage
                      name={`sections[${sectionIndex}].title`}
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
                    <input
                      name={`sections[${sectionIndex}].video`}
                      type="file"
                      className={
                        "form-control" +
                        (errors.sections?.[sectionIndex]?.video &&
                          touched.sections?.[sectionIndex]?.video
                          ? " is-invalid"
                          : "")
                      }
                    />
                    <ErrorMessage
                      name={`sections[${sectionIndex}].video`}
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
                      name={`sections[${sectionIndex}].description`}
                      as="textarea"
                      rows="4"
                      className={
                        "form-control" +
                        (errors.sections?.[sectionIndex]?.description &&
                          touched.sections?.[sectionIndex]?.description
                          ? " is-invalid"
                          : "")
                      }
                    />
                    <ErrorMessage
                      name={`sections[${sectionIndex}].description`}
                      component="div"
                      className="invalid-feedback"
                    />
                  </Col>
                </Row>
                {section.questions.length > 0 ? (
                  section.questions.map((question, questionIndex) => (
                    <div key={questionIndex}>
                      <Row className="mb-20">
                        <Col lg="3">
                          <label className="form-label">Question:</label>
                        </Col>
                        <Col lg="9">
                          <Field
                            name={`sections[${sectionIndex}].questions[${questionIndex}].question`}
                            type="text"
                            className={
                              "form-control" +
                              (errors.sections?.[sectionIndex]?.questions?.[questionIndex]?.question &&
                                touched.sections?.[sectionIndex]?.questions?.[questionIndex]?.question
                                ? " is-invalid"
                                : "")
                            }
                          />
                          <ErrorMessage
                            name={`sections[${sectionIndex}].questions[${questionIndex}].question`}
                            component="div"
                            className="invalid-feedback"
                          />
                        </Col>
                      </Row>
                      <Row className="mb-20">
                        <Col lg="3">
                          <label className="form-label">Answer:</label>
                        </Col>
                        <Col lg="9">
                          <Field
                            name={`sections[${sectionIndex}].questions[${questionIndex}].answer`}
                            type="text"
                            className={
                              "form-control" +
                              (errors.sections?.[sectionIndex]?.questions?.[questionIndex]?.answer &&
                                touched.sections?.[sectionIndex]?.questions?.[questionIndex]?.answer
                                ? " is-invalid"
                                : "")
                            }
                          />
                          <ErrorMessage
                            name={`sections[${sectionIndex}].questions[${questionIndex}].answer`}
                            component="div"
                            className="invalid-feedback"
                          />
                        </Col>
                      </Row>
                    </div>
                  ))
                ) : (
                  <Button
                    color="primary"
                    onClick={() => addQuestion(sectionIndex)}
                  >
                    Add Question
                  </Button>
                )}
                <div className="section-button-row">
                  <Button
                    color="danger"
                    onClick={() => deleteSection(sectionIndex)}
                  >
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
                Save
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default UploadCourse;
