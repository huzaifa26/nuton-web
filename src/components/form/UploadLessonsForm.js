import React, { useState } from "react";
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
import { Button } from "reactstrap";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { newCourse } from "@/redux/reducers/courseSlice";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "@/utils/firebase";
import { toast } from "react-toastify";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import Loader from "../Loader";


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
  const courseData = useSelector((state) => { return state.course.newCourse })
  const [sections, setSections] = useState(courseData?.sections || initialValues.sections);
  const dispatch = useDispatch()

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
    let course = { ...courseData };
    console.log(course)
    course['sections'] = sections;
    course['index'] = index;
    dispatch(newCourse(course));
    router.push({ pathname: "/uploadcontent", query: { data: JSON.stringify({ ...course, index }) } })
  }

  async function uploadImage(file) {
    try {
      const storageRef = ref(storage, "images/" + file.name);

      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      console.log("Image uploaded successfully. Download URL:", downloadURL);
      return downloadURL; // Return the download URL if needed

    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  }

  const [loading, setLoading] = useState(false)

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={SectionSchema}
      onSubmit={async (values) => {
        let data = {
          uid: user.uid,
          ...courseData
        }
        let courseLength = 0;
        data.sections.forEach((sec) => {
          courseLength = courseLength + sec.length
        })
        data.courseLength = courseLength;
        try {
          setLoading(true);
          // Upload course thumbnail if present
          if (data.courseThambnail instanceof File) {
            const thumbnailRef = ref(storage, "thumbnails/" + data.courseThambnail.name);
            await uploadBytes(thumbnailRef, data.courseThambnail);
            const thumbnailURL = await getDownloadURL(thumbnailRef);
            data.courseThambnail = thumbnailURL;
            console.log("Course thumbnail uploaded successfully.");
          }

          // Upload videos in topics array within sections array
          const updatedSections = await Promise.all(data.sections.map(async (section) => {
            const updatedTopics = await Promise.all(section.topics.map(async (topic) => {
              if (topic.video instanceof File) {
                const videoRef = ref(storage, "videos/" + topic.video.name);
                await uploadBytes(videoRef, topic.video);
                const videoURL = await getDownloadURL(videoRef);
                return { ...topic, video: videoURL };
              }
              return topic;
            }));
            return { ...section, topics: updatedTopics };
          }))
          let time = new Date();
          time = time.getTime()
          data = { ...data, sections: updatedSections, createdAt: time };

          if (data?.id) {
            const docRef = doc(db, "course", data.id);

            try {
              await setDoc(docRef, data, { merge: true });
              console.log("Document replaced successfully");
              toast.success("Course Updated");
              router.push("/courses")
            } catch (error) {
              console.error("Error replacing document:", error);
            }
          } else {
            const courseCollectionRef = collection(db, "course");
            addDoc(courseCollectionRef, data);
            toast.success("Course added");
            router.push("/uploadmain")
          }

          setLoading(false);
        } catch (error) {

          console.error("Error uploading file:", error);
          setLoading(false)
          throw error;
        }
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
                  {loading ? <Loader /> : "Save"}
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