import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { Button } from 'reactstrap'
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { RxCross2 } from "react-icons/rx"
import { useRouter } from "next/router";
import { query } from "firebase/firestore";
import { newCourse } from "@/redux/reducers/courseSlice";

const initialValues = {
  courseThambnail: "",
  courseTitle: "",
  courseDesc: "",
  courseCategory: "",
  courseTags: "",
  price: "",
  discount: "",
  languages: "",
};

const PersonalInfoSchema = Yup.object().shape({
  // courseThambnail: Yup.string().required("Upload course thumbnail"),
  courseTitle: Yup.string().required("Course Title is required"),
  courseDesc: Yup.string().required("Course Description is required"),
  courseCategory: Yup.string().required("Course selection is required"),
  price: Yup.string().required("Price is required"),
  // courseTags: Yup.string().required("Course tags are required"),
  languages: Yup.string().required("Languages are required"),
});

function UploadCourse() {
  const router = useRouter()
  const { id } = router.query

  const dispatch = useDispatch()
  const user = useSelector((state) => state.user.user);
  const allCourses = useSelector((state) => state.course.allCourses);
  const [editCourse, setEditCourse] = useState()

  console.log(allCourses)
  const [iniValues, setIniValues] = useState()

  useEffect(() => {
    const specificCourse = allCourses?.find((course) => course.id === id);
    console.log(specificCourse);
    setIniValues(specificCourse || initialValues);
    setEditCourse(specificCourse);
    setTags(specificCourse?.courseTags || []);
  }, [allCourses, id]);

  const [image, setImage] = useState(null)
  const [tags, setTags] = useState([])
  const [tag, setTag] = useState()
  const [showImageError, setShowErrorMessage] = useState(false);

  const removeTagHandler = (index) => {
    let arr = [...tags];
    arr.splice(index, 1);
    setTags(arr);
  }

  const fileInputRef = useRef(null);

  const thumbnailImageHandler = (e) => {
    let file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const image = new Image();

        image.onload = () => {
          const dimensions = {
            width: image.width,
            height: image.height
          };
          console.log(dimensions);
          if ((dimensions.width < 600 && dimensions.height < 600) && (dimensions.width === dimensions.height)) {
            setImage(file);
            setShowErrorMessage(false);
          } else {
            fileInputRef.current.value = null; // Clear the file input value
            setShowErrorMessage(true);
          }
        };

        image.src = e.target.result;
      };

      reader.readAsDataURL(file); // Read the contents of the file
    }
  };

  return (
    <>
      <Formik
        initialValues={iniValues}
        enableReinitialize={true}
        validationSchema={PersonalInfoSchema}
        onSubmit={async (fields) => {

          let data = {
            courseThambnail: image || fields.courseThambnail || editCourse.courseThambnail || null,
            courseTitle: fields.courseTitle,
            courseDesc: fields.courseDesc,
            courseCategory: fields.courseCategory,
            courseTags: tags,
            price:fields.price,
            discount:fields.discount,
            languages: fields.languages,
          }

          console.log(data);
          if (id) {
            let editedCourse = { ...editCourse, ...data }
            dispatch(newCourse(editedCourse));
          } else {
            dispatch(newCourse(data));
          }
          router.push({ pathname: "/uploadlessons" })
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <div className="row mb-20">
              <label className="mt-12 form-label col-lg-3">Course Thumbnail</label>
              <div className="col-lg-9">
                <img style={{ marginLeft: '157px' }} src={image && URL.createObjectURL(image) || iniValues?.courseThambnail || image} />
                {/* <div className={
                  "form-control col-lg-9" +
                  (errors.courseThambnail && touched.courseThambnail
                    ? " is-invalid"
                    : "")}>
                  <label htmlFor="image" className="cursor-pointer bg-[#DDE0E3] text-[#A1A8BB] rounded-[4px] px-[12px] py-[6px] mt-[-6px]" >Choose Image</label>
                </div> */}
                <input
                  name="courseThambnail"
                  type="file"
                  id="image"
                  className={
                    "form-control col-lg-9 mt-10" +
                    (errors.courseThambnail && touched.courseThambnail
                      ? " is-invalid"
                      : "")
                  }
                  onChange={(e) => { thumbnailImageHandler(e) }}
                  ref={fileInputRef}
                  multiple
                />
                {showImageError ? <p className="text-[#f1416c] mt-[5px] mb-[-10px]">Image must be square and less than 600x600</p> : null}
                <ErrorMessage
                  name="courseThambnail"
                  component="div"
                  className="invalid-feedback"
                />
              </div>
            </div>
            <div className="row mb-20">
              <label className="mt-1 form-label col-lg-3">Course Title</label>
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
              <label className="form-label col-lg-3">Course Price</label>
              <div className="col-lg-9">
                <Field
                  name="price"
                  type="number"
                  className={
                    "form-control col-lg-9" +
                    (errors.price && touched.price
                      ? " is-invalid"
                      : "")
                  }
                />
                <ErrorMessage
                  name="price"
                  component="div"
                  className="invalid-feedback"
                />
              </div>
            </div>

            <div className="row mb-20">
              <label className="form-label col-lg-3">Discount</label>
              <div className="col-lg-9">
                <Field
                  name="discount"
                  type="number"
                  className={
                    "form-control col-lg-9" +
                    (errors.discount && touched.discount
                      ? " is-invalid"
                      : "")
                  }
                />
                <ErrorMessage
                  name="discount"
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
              <div style={{ display: 'flex', flexDirection: "column" }} className="col-lg-9">
                <input
                  name="courseTags"
                  type="text"
                  className={
                    "form-control h-full bg-[red]" +
                    (errors.courseTags && touched.courseTags
                      ? " is-invalid"
                      : "")
                  }
                  value={tag}
                  onChange={(e) => { setTag(e.target.value) }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault(); 
                      setTags((prev) => {
                        return [...prev, tag]
                      }); setTag('')
                    }
                  }}
                />
                <div className="overflow-scroll flex gap-[0.521vw] px-[20px] py-[10px]">
                  {tags?.map((tag, index) => {
                    return (
                      <div className="flex gap-[0.521vw] justify-center h-[30px] px-[10px]">
                        <p>{tag}</p>
                        <RxCross2 onClick={() => removeTagHandler(index)} className="mt-[3px] hover:bg-[rgba(0,0,0,0.15)] rounded-full" />
                      </div>
                    )
                  })}
                </div>
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