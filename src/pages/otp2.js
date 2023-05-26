import { db } from "@/utils/firebase";
import { doc, updateDoc } from "firebase/firestore";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';

function Otp2() {

    const user = useSelector((state) => state.user.user);
    const router=useRouter();
    const phone = router.query;


    const [code, setCode] = useState();

    const sendHandler = async() => {
        try {
            const comfirmResult=window.confirmCode;
            comfirmResult.confirm(code).then(async(result)=>{
                console.log(result);
                const docRef = doc(db, 'users', user.uid);
                await updateDoc(docRef, {
                    phone: phone,
                    phoneVerified: true
                })
                router.push('/')
            })
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <div className="authincation section-padding">
                <div className="container h-100">
                    <div className="row justify-content-center h-100 align-items-center">
                        <div className="col-xl-5 col-md-6">
                            <div className="mini-logo text-center my-12">
                                <Link href="/">

                                    <img src="./images/logo.png" alt="" />

                                </Link>
                            </div>
                            <div className="card">
                                <div className="card-header justify-content-center">
                                    <h4 className="card-title">
                                        {" "}
                                        2-Step Verification
                                    </h4>
                                </div>
                                <div className="card-body">
                                    <p className="text-center mb-16">
                                        Enter the verification code generated by
                                        your phone ending in +xxx xxxxxxxx60.
                                    </p>
                                    <form className="row g-3">
                                        <div className="col-12">
                                            <div className="input-group">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text">
                                                        <i className="ri-smartphone-line"></i>
                                                    </span>
                                                </div>
                                                <input
                                                    onChange={(e) => { setCode(e.target.value) }}
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="verification code"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="text-center">
                                                <button
                                                    onClick={sendHandler}
                                                    type="button"
                                                    className="btn btn-primary btn-block"
                                                >
                                                    Send
                                                </button>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="form-check form-switch">
                                                <input
                                                    type="checkbox"
                                                    className="form-check-input"
                                                    id="exampleCheck1"
                                                />
                                                <label
                                                    className="form-check-label"
                                                    for="exampleCheck1"
                                                >
                                                    <small>
                                                        Don't ask me for the
                                                        code again for 30 days
                                                        when I use this
                                                        computer.
                                                    </small>
                                                </label>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="new-account mt-16">
                                <p>
                                    Don't get code?
                                    <Link href="/otp1">
                                        Resend

                                    </Link>
                                </p>
                            </div>

                            <div
                                className="alert alert-success  fade show d-flex justify-content-between"
                                role="alert"
                            >
                                <span>
                                    Please enter verification token from your
                                    device
                                </span>
                                <span
                                    className="c-pointer"
                                    data-dismiss="alert"
                                >
                                    <i className="ri-close-line"></i>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Otp2;