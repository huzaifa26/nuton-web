import Link from "next/link";
import SignupForm from "./../components/form/SignupForm";

function Signin() {
    return (
        <>
            <div className="authincation section-padding">
                <div className="container h-100">
                    <div className="row justify-content-center h-100 align-items-center">
                        <div className="col-xl-5 col-md-6">
                            <div className="mini-logo text-center my-16">
                                <Link href="/">
                                    
                                        <img src="./images/logo.png" alt="" />
                                    
                                </Link>
                            </div>
                            <div className="card">
                                <div className="card-header justify-content-center">
                                    <h4 className="card-title">Sign up</h4>
                                </div>
                                <div className="card-body">
                                    <SignupForm />
                                    <div className="text-center">
                                        <p className="mt-16 mb-0">
                                            Have account?
                                            <Link href="/signin">
                                                    Sign in
                                            </Link>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="privacy-link">
                                <Link href="#">
                                    
                                        Have an issue with 2-factor
                                        authentication?
                                    
                                </Link>
                                <br />
                                <Link href="#">
                                    Privacy Policy
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Signin;
