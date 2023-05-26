import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { sendEmailVerification, getAuth, onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../utils/firebase";
import { doc, updateDoc } from "firebase/firestore";

function Test() {
	const router = useRouter();
	const [counter, setCounter] = useState(59);


	const sendVerificationEmail = async (e) => {
		setCounter(59);
		try {
			const result = await sendEmailVerification(auth.currentUser);
			// navigation.navigate("VerifyYourPhoneNumber")
		} catch (error) {
			console.log(error);
		}
	}


	useEffect(() => {
		const intervalId = setInterval(async () => {
			if (counter > 0) {
				setCounter((prev) => {
					return prev - 1
				})
			}
		}, 1000)

		const intervalId2 = setInterval(async () => {
			auth.currentUser.reload();
			if (auth.currentUser.emailVerified) {
				const docRef = doc(db, 'users', auth.currentUser.uid)
				await updateDoc(docRef, {
					emailVerified: true
				}).then(() => {
					router.push('/otp1');
				})
			} else {
				
			}
		}, 5000)

		return () => {
			clearInterval(intervalId);
			clearInterval(intervalId2);
		}
	}, [])


	return (
		<>
			<div className="verification section-padding">
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
									<h4 className="card-title">
										Verify your Email
									</h4>
								</div>
								<div className="card-body">
									<form className="identity-upload">
										<div className="identity-content">
											<span className="icon">
												<i className="ri-mail-check-line"></i>
											</span>
											<p>
												We sent verification email to
												&nbsp;
												<strong className="text-dark">
													example@email.com
												</strong>
												. Click the link inside to get
												started!
											</p>
										</div>
									</form>
								</div>
							</div>
							<div>
								Email didn't arrive?
								{counter > 0 ? "Resend in " + counter :
									<Link onClick={sendVerificationEmail} href={"#"}>
										Resend
									</Link>
								}
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
export default Test;
