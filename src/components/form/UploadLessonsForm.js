import React, { useState } from "react";
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
import { Button } from "reactstrap";


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
  const [sections, setSections] = useState(initialValues.sections);

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

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={SectionSchema}
      onSubmit={(values) => {
        alert("SUCCESS!! :-)\n\n" + JSON.stringify(values, null, 4));
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
                    onClick={() => handleSectionNameChange(index)}
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