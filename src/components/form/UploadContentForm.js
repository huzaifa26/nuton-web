import React, { useEffect, useRef, useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { Button, Row, Col } from "reactstrap";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { newCourse } from "@/redux/reducers/courseSlice";



const PersonalInfoSchema = Yup.object().shape({
  // courseTitle: Yup.string().required("Course Title is required"),
  // courseDesc: Yup.string().required("Course Description is required"),
  sections: Yup.array().of(
    Yup.object().shape({
      title: Yup.string().required("Title is required"),
      // video: Yup.string().required("Video is required"),
      description: Yup.string().required("Description is required"),
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


  useEffect(() => {
    if (courseData?.sections && courseData?.sections[courseData.index] && courseData?.sections[courseData.index]?.topics) {
      const topics = courseData?.sections[courseData.index].topics;
      const videos = topics.map((topic) => topic.video);
      setVideoArray(videos);
    }
  }, []);

  const [sectionErrors, setSectionErrors] = useState(Array(sections.length).fill(false));

  const videoUploadHandler = (e, index) => {
    const file = e.target.files[0];

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
            video: videoArray[index]
          }));
          const section = { ...data.sections[data.index], topics: topics }
          data.sections = data.sections.map((sec, index) => {
            if (index === data.index) {
              return section
            }
            return sec
          })
          console.log(data);
          dispatch(newCourse(data));
          // alert("SUCCESS!! :-)\n\n" + JSON.stringify(data, null, 4));
          router.push({ pathname: "/uploadlessons" })
        }}
      >
        {({ errors, touched }) => (
          <Form>
            {sections.map((section, index) => {
              return (
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
                      <input
                        // defaultValue={section.video}
                        ref={el => fileInputsRef.current[index] = el}
                        name={`sections[${index}].video`}
                        type="file"
                        className={
                          "form-control" +
                          (errors.sections?.[index]?.video &&
                            touched.sections?.[index]?.video
                            ? " is-invalid"
                            : "")
                        }
                        onChange={(e) => { videoUploadHandler(e, index) }}
                      />
                      {sectionErrors[index] ? <p className="text-[#f1416c] mt-[5px] mb-[-10px]">Plaese provide the mp4 format video</p> : null}
                      {/* <p>{section.video}</p> */}
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
              )
            })}
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