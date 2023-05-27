import { setUser, userActions } from "@/redux/reducers/userSlice";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch } from "react-redux";
import SigninForm from "../components/form/SigninForm";
import { auth, db } from "../utils/firebase";
import { toast } from "react-toastify";

function Signin() {
    const dispatch = useDispatch();
    const router = useRouter();
    const [loading, setLoading] = useState(false)

    const getCredentials = async (data) => {
        setLoading(true)
        try {
            const result = await signInWithEmailAndPassword(auth, data.email, data.password);
            const userRef = doc(db, "users", result.user.uid);
            const user = await getDoc(userRef);
            const u = user.data();
            dispatch(userActions.userInfo(u));
            if (!u.emailVerified) {
                router.push({
                    pathname: '/verify-email',
                    query: { email: data.email }, // example state data
                });
                return
            }
            if (!u.phoneVerified) {
                router.push('/otp1');
                return
            }
            router.push('/');
        } catch (e) {
            console.log(e.message);
            toast.error('Invalid credentials');
        } finally {
            setLoading(false)
        }
    }

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
                                    <SigninForm getCredentials={getCredentials} loading={loading} />
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
