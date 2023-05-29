import React from "react";
import "react-circular-progressbar/dist/styles.css";
import Layout from "../components/layout/Layout";
import UploadContentForm from "../components/form/UploadContentForm";


const percentage = 66;
const uploadContent = (props) => {
    return (
        <Layout
            headTitle="Upload Content"
            pageTitle="Upload Content"
            pageTitleSub={"Welcome to Egeria's Contentn Upload Page"}
            pageClass={"dashboard"}
            parent={"Course Structure"}
            child={""}
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
                            <UploadContentForm />

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};
export default uploadContent;