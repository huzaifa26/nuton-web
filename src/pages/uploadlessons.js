import React from "react";
import "react-circular-progressbar/dist/styles.css";
import UploadCourse from "../components/form/UploadCourse";
import Layout from "../components/layout/Layout";
import UploadLessonsForm from "../components/form/UploadLessonsForm";

const percentage = 66;

const UploadLessons = (props) => {
  return (
    <Layout
      headTitle="Course Structure"
      pageTitle="Create or Edit your Course Structure"
      pageTitleSub={"Welcome to Egeria's Course Structure page"}
      pageClass={"dashboard"}
      parent={"Course Description"}
      child={"Course Structure"}
    >
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
            </div>
            <div className="card-body">
              <div className="row d-flex justify-content-center align-items-center py-20">
                <div className="col-xl-8">
                  <UploadLessonsForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UploadLessons;