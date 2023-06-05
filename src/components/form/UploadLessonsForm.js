import React, { useState } from "react";
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
import { Button } from "reactstrap";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { newCourse } from "@/redux/reducers/courseSlice";


const initialValues = {
  sections: [{ name: "1. Introduction" }],
};

const SectionSchema = Yup.object().shape({
  sections: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required("Section name is required"),
    })
  ),
});

const UploadLessonsForm = () => {
  const router = useRouter();
  const user = useSelector((state) => state.user.user);
  const courseData=useSelector((state)=> {return state.course.newCourse})
  const [sections, setSections] = useState(courseData?.sections || initialValues.sections);
  const dispatch=useDispatch()

  const handleAddSection = () => {
    const nextSectionNumber = sections.length + 1;
    const nextSectionName = `${nextSectionNumber}. Example`;
    setSections([...sections, { name: nextSectionName }]);
  };

  const handleSectionNameChange = (event, index) => {
    const { value } = event.target;
    setSections((prevSections) => {
      const updatedSections = [...prevSections];
      updatedSections[index].name = value;
      return updatedSections;
    });
  };

  const handleRemoveSection = (index) => {
    setSections((prevSections) => {
      const updatedSections = [...prevSections];
      updatedSections.splice(index, 1);

      // Adjust section numbers
      updatedSections.forEach((section, i) => {
        section.name = `${i + 1}. ${section.name.substring(section.name.indexOf(" ") + 1)}`;
      });

      return updatedSections;
    });
  };

  const handleCourseContent = (index) => {
    let course = {...courseData};
    console.log(course)
    course['sections'] = sections;
    course['index'] = index;
    dispatch(newCourse(course));
    router.push({ pathname: "/uploadcontent", query: { data: JSON.stringify({ ...course, index }) } })
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={SectionSchema}
      onSubmit={(values) => {
        let data = { 
          uid: user.uid,
          ...courseData 
        }
        console.log(data);
        // router.push({ pathname: "/uploadcontent", query: { course: course, index: index } })
      }}
    >
      {({ errors, touched }) => (
        <Form>
          {sections.map((section, index) => (
            <div key={index} className="section">
              <Field
                name={`sections[${index}].name`}
                type="text"
                className={
                  "form-control" +
                  (errors.sections?.[index]?.name &&
                    touched.sections?.[index]?.name
                    ? " is-invalid"
                    : "")
                }
                placeholder={`Lesson ${index + 1}`}
                value={section.name}
                onChange={(event) => handleSectionNameChange(event, index)}
              />
              <button
                type="button"
                className="btn btn-link"
                value={section.name}
                // onClick={(event) => handleSectionNameChange(event,index)}
                onClick={(event) => handleCourseContent(index)}
              >
                ✏️
              </button>
              <button
                type="button"
                className="btn btn-link"
                onClick={() => handleRemoveSection(index)}
              >
                🗑️
              </button>

              <ErrorMessage
                name={`sections[${index}].name`}
                component="div"
                className="invalid-feedback"
              />
            </div>
          ))}
          <div className="row">
            <div className="col-lg-12">
              <div className="text-center">
                <Button color="success" onClick={handleAddSection} className="addButton">
                  +
                </Button>
              </div>
              <div className="text-center">
                <Button type="submit" color="primary">
                  Save
                </Button>
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default UploadLessonsForm;