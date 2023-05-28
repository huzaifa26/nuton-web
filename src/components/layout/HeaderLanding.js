import Link from "next/link";
function HeaderLanding() {
    return (
        <>
            <div className="header landing">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-12">
                            <nav className="navbar">
                                <Link href="/dashboard">
                                    
                                        <img src="./images/logo.png" alt="" />
                                    
                                </Link>
                                <div className="header-right">
                                    <div
                                        className="dark-light-toggle"
                                        onClick="themeToggle()"
                                    >
                                        <span className="dark">
                                            <i className="icofont-moon"></i>
                                        </span>
                                        <span className="light">
                                            <i className="icofont-sun-alt"></i>
                                        </span>
                                    </div>
                                    <Link href={'#'}>
                                        Buy
                                    </Link>
                                    
                                </div>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default HeaderLanding;