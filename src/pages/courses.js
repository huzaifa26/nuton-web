import Link from "next/link";
import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import CoursesGrid from "./../components/elements/CoursesGrid";
import GroupDiscussWidget from "./../components/elements/GroupDiscussWidget";
import TopPerformingWidget from "./../components/elements/TopPerformingWidget";
import { collection, doc, getDoc, onSnapshot, query, where } from "firebase/firestore";
import { useSelector } from "react-redux";
import { db } from "@/utils/firebase";
import SetReduxState from "@/components/SetReduxState";

function MyCourses() {



    return (
        <SetReduxState>
            <Layout
                headTitle="My Courses"
                pageTitle="My Courses"
                pageTitleSub={"Welcome to Edunet My Courses page"}
                pageClass={"dashboard"}
                parent={"Home"}
                child={"My Courses"}
            >
                <div className="row">
                    <div className="col-xl-8">
                        <div className="row">
                            <CoursesGrid />
                        </div>
                    </div>
                    <div className="col-xl-4">
                        <div className="right-sidebar">
                            <div className="row">
                                {/* <div className="col-12">
                                <div className="card transparent">
                                    <div className="card-header">
                                        <h4 className="card-title">
                                            Group Discussions
                                        </h4>
                                        <Link href="/create-group">
                                            Create Group
                                            <i className="ri-arrow-right-line ms-10"></i>
                                        </Link>
                                    </div>
                                    <div className="card-body ">
                                        <div className="g-discussion-inner row">
                                            <GroupDiscussWidget />
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                                <div className="col-12">
                                    <div className="card transparent">
                                        <div className="card-header">
                                            <h4 className="card-title">
                                                Top Performance Courses
                                            </h4>
                                        </div>
                                        <div className="card-body">
                                            <div className="g-discussion-inner row">
                                                <TopPerformingWidget />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </SetReduxState>
    );
}
export default MyCourses;
