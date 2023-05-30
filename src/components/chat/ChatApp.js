import Link from "next/link";
import React, { useRef, useState } from "react";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import ChatIntro from "./../elements/chatIntro";
import Message from "./Message/Message";
import User from "./User/User";
import usersData from "./users.json";
import Sidebar from "../layout/sidebar";

import Header from "../layout/Header";
function ChatApp() {
    const [userActive, setUserActive] = useState([]);
    const messagesEndRef = useRef(null);
    const scrollToBottom = () => {
        setTimeout(() => {
            messagesEndRef.current && messagesEndRef.current.scrollIntoView();
        }, 0);
    };

    function userSelected(event) {
        const addUserActive = {
            id: parseInt(event.id, 10),
            name: event.name,
        };
        setUserActive(addUserActive);
        scrollToBottom();
    }

    const [activeTab, setActiveTab] = useState("1");

    const toggle = (tab) => {
        if (activeTab !== tab) setActiveTab(tab);
    };

    return (

        <div className="chat__box">
                <Sidebar/>
        <div className="container">
        
            <div className="row">
                <div className="col-xl-3">
                    <div className="card mb-0" style={{height:"100vh"}}>
                        <div className="card-body">
                            <div>
                                <Nav tabs>
                                    <NavItem>
                                        <NavLink
                                            className={{
                                                active: activeTab === "1",
                                            }}
                                            onClick={() => {
                                                toggle("1");
                                            }}
                                        >
                                            All Messages
                                        </NavLink>
                                    </NavItem>
                                    {/* <NavItem>
                                        <NavLink
                                            className={{
                                                active: activeTab === "2",
                                            }}
                                            onClick={() => {
                                                toggle("2");
                                            }}
                                        >
                                            Groups
                                        </NavLink>
                                    </NavItem> */}
                                </Nav>
                                <TabContent activeTab={activeTab}>
                                    <TabPane tabId="1">
                                        <User
                                            users={usersData}
                                            userSelected={userSelected}
                                            userActive={userActive}
                                        />
                                    </TabPane>
                                </TabContent>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-9">
                    <div className="card mb-0">
                        <div className="card-body" style={{height:"100vh"}}>
                            {userActive.id ? (
                                <Message
                                    userActive={userActive}
                                    messagesEndRef={messagesEndRef}
                                    scrollToBottom={scrollToBottom}
                                />
                            ) : (
                                <ChatIntro />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
}
export default ChatApp;
