// import { auth } from "@/utils/firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";
import { getAuth } from "firebase/auth";
import { useRouter } from "next/router";

function Reset() {
  const [email,setEmail]=useState();
  const auth=getAuth();
  const router=useRouter()

  const formHandler = async (e) => {
    e.preventDefault();
    try {
      const result = await sendPasswordResetEmail(auth, email);
      console.log("Password reset email sent successfully");
      toast.success("Password Change Email sent. Please check your inbox.");
      router.push("/");
    } catch (error) {
      console.log(error);
      toast.error("Error sending Password Change Email.");
    }
  }

  return (
    <>
      <div className="authincation section-padding">
        <div className="container h-100">
          <div className="row justify-content-center h-100 align-items-center">
            <div className="col-xl-4 col-md-5">
              <div className="mini-logo text-center my-12">
                <Link href="/dashboard">
                  <img src="./images/logo.png" alt="" />
                </Link>
              </div>
              <div className="card">
                <div className="card-header justify-content-center">
                  <h4 className="card-title">
                    Reset Password
                  </h4>
                </div>
                <div className="card-body">
                  <form onSubmit={formHandler} className="g-3">
                    <label className="form-label">
                      Email
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      placeholder="Email"
                      onChange={(e)=> setEmail(e.target.value)}
                    />
                    <div className="mt-16">
                      <button
                        type="submit"
                        className="btn btn-primary w-100"
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                </div>

                <div className="new-account mt-16">
                  <p>
                    Don't get code?
                    <Link href="/otp1">
                      Resend
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Reset;
