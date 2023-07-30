import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import SetReduxState from "../SetReduxState";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "@/utils/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { setUser } from "@/redux/reducers/userSlice";
import { useCookies } from "react-cookie";

const UpdateAvatarSchema = Yup.object().shape({
    fullName: Yup.string().required("Full Name is required"),
    // photo: Yup.string().required("Photo required"),
});

function UpdateAvatar() {
    const [cookies, setCookie] = useCookies();
    const dispatch=useDispatch()
    const user = useSelector((state) => state.user.user);
    
    const initialValues = {
        fullName: user?.name,
        photo: user?.image,
    }

    const [image, setImage] = useState(null);

    return (
        <SetReduxState>
            <Formik
                initialValues={initialValues}
                enableReinitialize={true}
                validationSchema={UpdateAvatarSchema}
                onSubmit={async (fields) => {
                    let data = {
                        name: fields.fullName
                    }
                    if (image) {
                        const file = image;
                        const filename = user?.name + file?.name;

                        const storageRef = ref(storage, filename);
                        await uploadBytes(storageRef, file);

                        const downloadURL = await getDownloadURL(storageRef);
                        data.image = downloadURL
                    }

                    const docRef = doc(db, 'users', user?.uid);
                    await updateDoc(docRef, {
                        name: data.name,
                        image:data.image
                    });

                    dispatch(setUser({...user,name:data.name,image:data.image}))
                    setCookie('user', {...user,name:data.name,image:data.image}, { path: '/' });
                }}
            >
                {({ errors, status, touched }) => (
                    <Form>
                        <div className="row">
                            <div className="col-10 mb-16">
                                <label className="form-label">Name</label>
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
                            <div className="col-xxl-12 ">
                                <div className="d-flex align-items-center mb-20" >
                                    <img
                                        style={{
                                            objectFit:"fill",
                                            height: "150px",
                                            width: "150px"
                                        }}
                                        className="rounded-circle"
                                        src={image ? URL.createObjectURL(image) : user?.image ? user?.image : "images/avatar/1.png"}
                                        alt=""
                                    />
                                    <div className="ml-5 media-body">
                                        <h4 className="mb-0">{user?.name}</h4>
                                        <p className="mb-0">
                                            Max file size is 20mb
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12">
                                <input
                                    accept="image/*"
                                    name="photo"
                                    type="file"
                                    className={
                                        (errors.photo && touched.photo
                                            ? " is-invalid"
                                            : "")
                                    }
                                    onChange={(e) => {
                                        const file = e.target.files[0];
                                        setImage(file);
                                    }}
                                />
                                <ErrorMessage
                                    name="photo"
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
export default UpdateAvatar;
