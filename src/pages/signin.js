import Link from "next/link";
import SigninForm from "../components/form/SigninForm";

function Signin() {
    return (
        <>
            <div className="authincation section-padding">
                <div className="container h-100">
                    <div className="row justify-content-center h-100 align-items-center">
                        <div className="col-xl-5 col-md-6">
                            <div className="mini-logo text-center mb-35">
                                <Link href="/">
                                    
                                        <img src="./images/logo.png" alt="" />
                                    
                                </Link>
                            </div>
                            <div className="card">
                                <div className="card-header justify-content-center">
                                    <h4 className="card-title">Sign in</h4>
                                </div>
                                <div className="card-body">
                                    <SigninForm />
                                    <p className="mt-16 mb-0">
                                        Don't have an account?
                                        <Link href="/signup">
                                                Sign up
                                            
                                        </Link>
                                    </p>
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
