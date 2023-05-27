import { ErrorMessage, Field, Form, Formik } from "formik";
import Link from "next/link";
import * as Yup from "yup";
import Loader from "../widget/Loader";

const initialValues = {
    fullName: "",
    email: "",
    password: "",
    acceptTerms: false,
};

const SignupFormSchema = Yup.object().shape({
    fullName: Yup.string().required("Full is required"),
    email: Yup.string().email("Email is invalid").required("Email is required"),
    password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    acceptTerms: Yup.bool().oneOf([true], "Accept Ts & Cs is required"),
});

function SignupForm({ getSignUpDate, loading }) {
    return (
        <>
            <Formik
                initialValues={initialValues}
                validationSchema={SignupFormSchema}
                onSubmit={(fields) => {
                    getSignUpDate(fields)
                }}
            >
                {({ errors, status, touched }) => (
                    <Form>
                        <div className="row">
                            <div className="col-12 mb-16">
                                <label className="form-label">Full Name</label>
                                <Field
                                    name="fullName"
                                    type="text"
                                    className={
                                        "form-control" +
                                        (errors.fullName && touched.fullName
                                            ? " is-invalid"
                                            : "")
                                    }
                                />
                                <ErrorMessage
                                    name="fullName"
                                    component="div"
                                    className="invalid-feedback"
                                />
                            </div>
                            <div className="col-12 mb-16">
                                <label className="form-label">Email</label>
                                <Field
                                    name="email"
                                    type="text"
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

                            <div className="col-12 mb-16">
                                <label className="form-label">Password</label>
                                <Field
                                    name="password"
                                    type="password"
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
                            <div className="col-12">
                                <div className="form-check">
                                    <Field
                                        type="checkbox"
                                        name="acceptTerms"
                                        className={
                                            "form-check-input " +
                                            (errors.acceptTerms &&
                                                touched.acceptTerms
                                                ? " is-invalid"
                                                : "")
                                        }
                                    />
                                    <label className="form-check-label">
                                        I certify that I am 18 years of age or older, and agree to the <Link href="#" className="text-primary" />User Agreement and <Link href="#" className="text-primary" />Privacy Policy.
                                    </label>
                                    <ErrorMessage
                                        name="acceptTerms"
                                        component="div"
                                        className="invalid-feedback"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mt-16 d-grid gap-2">
                            <button
                                type="submit"
                                className="btn btn-primary mr-2 absolute text-white"
                            >
                                {loading ? <Loader className="text-[#ffffff]" /> : 'Sign up'}
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </>
    );
}
export default SignupForm;
