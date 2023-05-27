import { createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import Link from "next/link";
import { useRouter } from "next/router";
import { auth, db } from "../utils/firebase";
import SignupForm from "./../components/form/SignupForm";
import { setUser } from "@/redux/reducers/userSlice";
import { useDispatch } from "react-redux";
import { toast } from 'react-toastify'
import { useState } from "react";

function Signin() {
  const router = useRouter();
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)

  const sendVerificationEmail = async () => {
    try {
      const result = await sendEmailVerification(auth.currentUser);
      toast.success('Email verification sent')
    } catch (error) {
      console.log(error);
    }
  }

  const getSignUpDate = async (data) => {
    setLoading(true)
    let d = {
      name: data.fullName,
      email: data.email,
      password: data.password,
      phoneVerified: false,
      emailVerified: false,
      signinFrom: "web"
    }
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then(async (userCredentials) => {
        delete d.password;
        d.uid = userCredentials.user.uid
        await setDoc(doc(db, "users", userCredentials.user.uid), d);
        const result = await signInWithEmailAndPassword(auth, data.email, data.password);
        const userRef = doc(db, "users", result.user.uid);
        const user = await getDoc(userRef);
        dispatch(setUser(user.data()));
        await sendVerificationEmail(d.email);
        router.push({
          pathname: '/verify-email',
          query: { email: data.email }, // example state data
        });
      })
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use')
          toast.error('You have account already')
        console.log(error.code);
      })
      .finally(() => {
        setLoading(false)
      })
  }

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
                  <SignupForm getSignUpDate={getSignUpDate} loading={loading} />
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
