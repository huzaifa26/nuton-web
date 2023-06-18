import React, { useEffect, useRef, useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { Button, Row, Col } from "reactstrap";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { newCourse } from "@/redux/reducers/courseSlice";
import { v4 as uuidv4 } from 'uuid';

const PersonalInfoSchema = Yup.object().shape({
  sections: Yup.array().of(
    Yup.object().shape({
      title: Yup.string().required("Title is required"),
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
    sections: courseData?.sections[courseData.index]?.topics || [{ title: "", video: "", description: "" }],
  };

  const [sections, setSections] = useState(courseData?.sections[courseData.index]?.topics || [{ title: "", video: "", description: "" }]);

  const addSection = () => {
    setSections([...sections, { title: "", video: "", description: "" }]);
  };

  const deleteSection = (index) => {
    const updatedSections = [...sections];
    updatedSections.splice(index, 1);
    setSections(updatedSections);
  };

  const [videoArray, setVideoArray] = useState([]);
  const fileInputsRef = useRef([]);
  const videoRef = useRef([]);

  useEffect(() => {
    if (courseData?.sections && courseData?.sections[courseData.index] && courseData?.sections[courseData.index]?.topics) {
      const topics = courseData?.sections[courseData.index].topics;
      const videos = topics.map((topic, index) => {
        if (topic.video && topic.video.type === 'video/mp4') {
          const videoObject = URL.createObjectURL(topic.video);
          videoRef.current[index].src = videoObject;
        }else {
          videoRef.current[index].src = topic.video;
        }
        return topic.video
      });
      setVideoArray(videos);
    }
  }, []);

  console.log(videoRef)

  const [sectionErrors, setSectionErrors] = useState(Array(sections.length).fill(false));


  const videoUploadHandler = (e, index) => {
    const file = e.target.files[0];

    if (file) {
      const videoObject = URL.createObjectURL(file);

      videoRef.current[index].src = videoObject;

      videoRef.current[index].onloadedmetadata = () => {
        console.log('Video duration:', videoRef.current[index].duration);
      };
    }

    if (file && file.type === 'video/mp4') {
      setVideoArray((prev) => [...prev, file]);
      const updatedErrors = [...sectionErrors];
      updatedErrors[index] = false;
      setSectionErrors(updatedErrors);
    } else {
      const updatedErrors = [...sectionErrors];
      updatedErrors[index] = true;
      setSectionErrors(updatedErrors);
      fileInputsRef.current[index].value = null
      console.log('Invalid video format. Please select an MP4 video.');
    }
  }

  const addQuestion = (sectionIndex) => {
    const numQuestions = parseInt(prompt("Enter the number of questions you want to add:"));

    if (!isNaN(numQuestions)) {
      const updatedSections = [...sections];
      const topicToUpdate=updatedSections[sectionIndex];
      let questions = Array(numQuestions).fill({
        question: "",
        answer: "",
      });
      updatedSections[sectionIndex]={...topicToUpdate, questions}
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
          let sectionLength = 0;
          const topics = fields.sections.map((topic, index) => {
            sectionLength = sectionLength + videoRef?.current[index]?.duration
            return ({
              ...topic,
              video: videoArray[index],
              length: videoRef?.current[index]?.duration,
              id: uuidv4(),
              questions:topic.questions
            })
          });
          const section = { ...data.sections[data.index], topics: topics }
          data.sections = data.sections.map((sec, index) => {
            if (index === data.index) {
              return { length: sectionLength, ...section }
            }
            return { length: sectionLength, ...sec }
          })
          dispatch(newCourse(data));
          router.push({ pathname: "/uploadlessons" })
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
                    {
                      <div style={videoRef.current[sectionIndex]?.src ? {} : { display: 'none' }} className="max-h-[300px] mb-8">
                        <video className="max-h-[300px]" ref={el => videoRef.current[sectionIndex] = el} controls />
                      </div>
                    }
                    <input
                      name={`sections[${sectionIndex}].video`}
                      ref={el => fileInputsRef.current[sectionIndex] = el}
                      type="file"
                      className={
                        "form-control" +
                        (errors.sections?.[sectionIndex]?.video &&
                          touched.sections?.[sectionIndex]?.video
                          ? " is-invalid"
                          : "")
                      }
                      onChange={(e) => { videoUploadHandler(e, sectionIndex) }}
                    />
                    {sectionErrors[sectionIndex] ? <p className="text-[#f1416c] mt-[5px] mb-[-10px]">Please provide the mp4 format video</p> : null}
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
                {section?.questions?.length > 0 ? (
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
