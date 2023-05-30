import { ErrorMessage, Field, Form, Formik } from "formik";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import SetReduxState from "../SetReduxState";

;

const PersonalInfoSchema = Yup.object().shape({
    fullName: Yup.string().required("Full is required"),
    email: Yup.string().email("Email is invalid").required("Email is required"),
    address: Yup.string().required("Present Address is required"),
    city: Yup.string().required("City is required"),
    postal: Yup.string().required("Post code is required"),
    country: Yup.string().required("country is required"),
});

function PersonalInfo() {
    const user=useSelector((state)=> state.user.user);

    const initialValues = {
        name: user?.name,
        email: user?.email,
        phone: user?.phone,
        location: user?.location,
    }
    return (
        <SetReduxState>
            <Formik
                initialValues={initialValues}
                validationSchema={PersonalInfoSchema}
                onSubmit={(fields) => {
                    alert(
                        "SUCCESS!! :-)\n\n" + JSON.stringify(fields, null, 4)
                    );
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
