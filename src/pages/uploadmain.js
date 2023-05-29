import React from "react";
import "react-circular-progressbar/dist/styles.css";
import UploadCourse from "../components/form/UploadCourse";
import Layout from "../components/layout/Layout";
import UploadMainCourse from "../components/form/UploadMainForm";
const percentage = 66;
const uploadMain = (props) => {
    return (
        <Layout
            headTitle="Course Description"
            pageTitle="Course Description"
            pageTitleSub={"Welcome to Egeria's Course Description page"}
            pageClass={"dashboard"}
            parent={"Home"}
            child={"upload"}
        >
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        {/* <div className="card-header">
                        <h4 className="card-title">Upload Details</h4>
                    </div> */}
                        <div className="card-body">
                            <div className="row d-flex justify-content-center align-items-center py-20">
                                <div className="col-xl-8">
                                    <UploadMainCourse />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};
export default uploadMain;