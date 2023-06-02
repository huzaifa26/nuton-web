import { auth } from "@/utils/firebase";
import { signInWithEmailAndPassword, updatePassword } from "firebase/auth";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import useReduxState from "../useReduxState";


const UpdateInfoSchema = Yup.object().shape({
    email: Yup.string().email("Email is invalid").required("Email is required"),
    password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    newPassword: Yup.string()
        .min(6, "New Password must be at least 6 characters")
        .required("Password is required"),
});

function UpdateInfo() {

    const user = useSelector((state) => state.user.user);
    let initialValues = {
        email: user?.email,
        password: "",
        newPassword: "",
    };
    return (
        <useReduxState>
            <Formik
                enableReinitialize={true}
                initialValues={initialValues}
                validationSchema={UpdateInfoSchema}
                onSubmit={(fields,{ resetForm }) => {
                    alert(1);
                    signInWithEmailAndPassword(auth,user?.email,fields?.password)
                        .then((userCredential) => {
                            const user = userCredential.user;

                            updatePassword(user, fields.newPassword)
                            .then(() => {
                                console.log("Password updated successfully.");
                                resetForm()
                            })
                            .catch((error) => {
                                console.log(error.code, error.message);
                            });
                        })
                        .catch((error) => {
                            console.log(error.code, error.message);
                        });
                }}
            >
                {({ errors, status, touched }) => (
                    <Form>
                        <div className="row">
                            <div className="col-10 mb-16">
                                <label className="form-label">Email</label>
                                <Field
                                    name="email"
                                    type="text"
                                    disabled={true}
                                    style={{
                                        opacity: 0.6,
                                        cursor: "not-allowed"
                                    }}
                                    className={
                                        "form-control" +
                                        (errors.email && touched.email
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
                            <div className="col-10 mb-16">
                                <label className="form-label">Current Password</label>
                                <Field
                                    name="password"
                                    type="text"
                                    className={
                                        "form-control" +
                                        (errors.password && touched.password
                                            ? " is-invalid"
                                            : "")
                                    }
                                />
                                <ErrorMessage
                                    name="password"
                                    component="div"
                                    className="invalid-feedback"
                                />
                            </div>
                            <div className="col-10 mb-16">
                                <label className="form-label">New Password</label>
                                <Field
                                    name="newPassword"
                                    type="text"
                                    className={
                                        "form-control" +
                                        (errors.password && touched.password
                                            ? " is-invalid"
                                            : "")
                                    }
                                />
                                <ErrorMessage
                                    name="newPassword"
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
        </useReduxState>
    );
}
export default UpdateInfo;
