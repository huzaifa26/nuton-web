import { ErrorMessage, Field, Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import SetReduxState from "../SetReduxState";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/utils/firebase";
import { setUser } from "@/redux/reducers/userSlice";
import { useCookies } from "react-cookie";

;

const PersonalInfoSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    location: Yup.string().required("Location is required"),
});

function PersonalInfo() {
    const user = useSelector((state) => state.user.user);
    const [cookies, setCookie] = useCookies();
    const dispatch=useDispatch();

    let initialValues = {
        name: user?.name,
        email: user?.email,
        phone: user?.phone,
        location: user?.location,
    }
    return (
        <SetReduxState>
            <Formik
                enableReinitialize={true}
                initialValues={initialValues}
                validationSchema={PersonalInfoSchema}
                onSubmit={async(fields) => {
                    const docRef = doc(db, 'users', user?.uid);
                    await updateDoc(docRef, {
                        name: fields.name,
                        location: fields.location
                    });

                    dispatch(setUser({ ...user, name: fields.name, location: fields.location }))
                    setCookie('user', { ...user, name: fields.name, location: fields.location }, { path: '/' });
                }}
            >
                {({ errors, status, touched }) => (
                    <Form>
                        <div className="row">
                            <div className="col-xxl-10 col-xl-6 col-lg-6 mb-16">
                                <label className="form-label">Name</label>
                                <Field
                                    name="name"
                                    type="text"
                                    className={
                                        "form-control" +
                                        (errors.fullName && touched.fullName
                                            ? " is-invalid"
                                            : "")
                                    }
                                />
                                <ErrorMessage
                                    name="name"
                                    component="div"
                                    className="invalid-feedback"
                                />
                            </div>
                            <div className="col-xxl-10 col-xl-6 col-lg-6 mb-16">
                                <label className="form-label">Email</label>
                                <Field
                                    name="email"
                                    type="text"
                                    className={
                                        "form-control" +
                                        (errors.fullName && touched.fullName
                                            ? " is-invalid"
                                            : "")
                                    }
                                />
                                <ErrorMessage
                                    name="email"
                                    component="div"
                                    className="invalid-feedback"
                                />
                            </div>
                            <div className="col-xxl-10 col-xl-6 col-lg-6 mb-16">
                                <label className="form-label">Phone</label>
                                <Field
                                    name="phone"
                                    type="text"
                                    className={
                                        "form-control" +
                                        (errors.fullName && touched.fullName
                                            ? " is-invalid"
                                            : "")
                                    }
                                />
                                <ErrorMessage
                                    name="phone"
                                    component="div"
                                    className="invalid-feedback"
                                />
                            </div>
                            <div className="col-xxl-10 col-xl-6 col-lg-6 mb-16">
                                <label className="form-label">Location</label>
                                <Field
                                    name="location"
                                    type="text"
                                    className={
                                        "form-control" +
                                        (errors.fullName && touched.fullName
                                            ? " is-invalid"
                                            : "")
                                    }
                                />
                                <ErrorMessage
                                    name="location"
                                    component="div"
                                    className="invalid-feedback"
                                />
                            </div>
                        </div>

                        <div className="mt-16">
                            <button
                                type="submit"
                                className="btn btn-primary mr-2"
                            >
                                Save
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </SetReduxState>
    );
}
export default PersonalInfo;
