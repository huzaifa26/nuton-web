import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

function Sidebar() {
    const router = useRouter();
    const mainNavLink = [
        {
            icon: "ri-grid-fill",
            name: "Dashboard",
            path: "dashboard",
        },
        {
            icon: "ri-stack-fill",
            name: "Courses",
            path: "courses",
        },
        // {
        //     icon: "ri-wallet-3-fill",
        //     name: "Wallet",
        //     path: "wallet",
        // },
        // {
        //     icon: "ri-hand-coin-fill",
        //     name: "Withdraw",
        //     path: "withdraw",
        // },
        {
            icon: "ri-message-3-fill",
            name: "Chat",
            path: "chat",
        },
        {
            icon: "ri-upload-cloud-2-fill",
            name: "Upload",
            path: "uploadmain",
        },
        {
            icon: "ri-empathize-fill",
            name: "Board",
            path: "leader-board",
        }
    ];

    return (
        <>
            <div className="sidebar">
                <div className="brand-logo text-center">
                    {/* <Link href="/">
                        <a className="full-logo">
                            <img src="./images/logoi.png" alt="" width="50" />
                        </a>
                    </Link> */}
                    <Link href="/">
                        <img src="./images/egeria.png" alt="" width="60" />
                    </Link>
                </div>
                <div className="menu">
                    <ul>
                        {mainNavLink.map((item, id) => (
                            <>
                                <li className={router.pathname == `/${item.path}` ? "active" : `${item.class}`} key={id}>
                                    <Link href={`/${item.path}`}>
                                        <span>
                                            <i className={item.icon}></i>
                                        </span>
                                        <span className="nav-text">
                                            {item.name}
                                        </span>
                                    </Link>
                                </li>
                            </>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
}
export default Sidebar;
