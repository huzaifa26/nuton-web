import Link from "next/link";
import { DropdownMenu, DropdownToggle, UncontrolledDropdown } from "reactstrap";
import DropdownNotification from "./../elements/DropdownNotification";
import DropdownProfile from "./../elements/DropdownProfile";
import { useSelector } from "react-redux";
function Header() {
    const user=useSelector((state)=> state.user.user)
    return (
        <>
            <div className="header">
                <div className="container">
                    <div className="row">
                        <div className="col-xxl-12">
                            <div className="header-content">
                                <div className="header-left">
                                    <div className="brand-logo">
                                        <Link href="/">
                                                <img
                                                    src={"./images/logoi.png"}
                                                    alt=""
                                                    width="40"
                                                />
                                        </Link>
                                    </div>
                                    {/* <div className="search">
                                        <form action="#">
                                            <div className="input-group">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Search Here..."
                                                />
                                                <span className="input-group-text px-12">
                                                    <i className="ri-search-line"></i>
                                                </span>
                                            </div>
                                        </form>
                                    </div> */}
                                </div>

                                <div className="header-right">
                                    <div
                                        className="dark-light-toggle"
                                        onClick="themeToggle()"
                                    >
                                        <span className="dark">
                                            <i className="ri-moon-line"></i>
                                        </span>
                                        <span className="light">
                                            <i className="ri-sun-line"></i>
                                        </span>
                                    </div>
                                    
                                    <UncontrolledDropdown
                                        tag="div"
                                        className="mt-3 nav-item dropdown notification"
                                    >
                                        <DropdownToggle
                                            tag="div"
                                            data-toggle="dropdown"
                                        >
                                            <div className="notify-bell icon-menu">
                                                <span>
                                                    <i className="ri-notification-2-line"></i>
                                                </span>
                                            </div>
                                        </DropdownToggle>
                                        <DropdownMenu
                                            right
                                            className="dropdown-menu notification-list"
                                        >
                                            <div className="lists">
                                                <DropdownNotification />

                                                <Link
                                                    href="/notification"
                                                    className="d-block"
                                                >
                                                        See more
                                                        <i className="ri-arrow-right-s-line"></i>   
                                                </Link>
                                            </div>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>

                                    {/* <UncontrolledDropdown
                                        tag="div"
                                        className="dropdown profile_log"
                                    >
                                        <DropdownToggle
                                            tag="div"
                                            data-toggle="dropdown"
                                        >
                                            <div className="user icon-menu active">
                                                <span className="thumb">
                                                    <img
                                                        style={{
                                                            objectFit:"fill",
                                                            height:"100%",
                                                            width:"100%"

                                                        }}
                                                        className="rounded-circle"
                                                        // src="/images/avatar/1.png"
                                                        src={user?.image || "/images/avatar/1.png"}
                                                        alt=""
                                                        // width="40"
                                                    />
                                                </span>
                                            </div>
                                        </DropdownToggle>
                                        <DropdownMenu
                                            right
                                            className="dropdown-menu"
                                        >
                                            
                                            <DropdownProfile />
                                        </DropdownMenu>
                                    </UncontrolledDropdown> */}

                                    <Link href="settings-profile" legacyBehavior>
                                        <div className="profile_log">
                                            
                                            <div className="ml-1 user icon-menu active">
                                                <span className="thumb">
                                                    <img
                                                        style={{
                                                            objectFit:"fill",
                                                            height:"100%",
                                                            width:"100%"
                                                        }}
                                                        className="rounded-circle"
                                                        // src="/images/avatar/1.png"
                                                        src={user?.image || "/images/avatar/1.png"}
                                                        alt=""
                                                        // width="40"
                                                    />
                                                </span>
                                            </div>
                                        </div>
                                    </Link>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Header;
