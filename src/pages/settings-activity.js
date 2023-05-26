import Layout from "../components/layout/Layout";
import SettingsMenu from "./../components/layout/SettingsMenu";

function SettingsActivity() {
    return (
        <>
            <Layout
                headTitle="Activity"
                pageTitle="Activity"
                pageTitleSub={"Welcome to Edunet Activity page"}
                pageClass={"dashboard"}
                parent={"Settings"}
                child={"Activity"}
            >
                <div className="row">
                    <div className="col-md-3">
                        <SettingsMenu />
                    </div>
                    <div className="col-md-9">
                        <div className="card">
                            <div className="card-header">
                                <h4 className="card-title">
                                    Third-Party Applications{" "}
                                </h4>
                            </div>
                            <div className="card-body">
                                <div className="d-flex align-items-start">
                                    <span>
                                        <i className="ri-question-answer-line icon-circle bg-warning text-white me-16 mt-5"></i>
                                    </span>
                                    <div>
                                        <h5 className="mb-0">
                                            You haven't authorized any
                                            applications yet.
                                        </h5>
                                        <p>
                                            After connecting an application with
                                            your account, you can manage or
                                            revoke its access here.
                                        </p>
                                            Authorize now
                                        
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card">
                            <div className="card-header">
                                <h4 className="card-title">Web Sessions</h4>

                                <small>
                                    These sessions are currently signed in to
                                    your account. Sign out all other sessions
                                </small>
                            </div>
                            <div className="card-body">
                                <div className="table-responsive table-icon">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>Signed In</th>
                                                <th>Browser</th>
                                                <th>IP Address</th>
                                                <th>Near</th>
                                                <th>Current</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>1 day ago</td>
                                                <td>Chrome (Windows)</td>
                                                <td>250.364.239.254</td>
                                                <td>Bangladesh, Dhaka</td>
                                                <td>
                                                    <span>
                                                        <i className="ri-check-line text-success me-1"></i>
                                                    </span>
                                                    <span>
                                                        <i className="ri-close-line text-danger"></i>
                                                    </span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>1 day ago</td>
                                                <td>Chrome (Windows)</td>
                                                <td>250.364.239.254</td>
                                                <td>Bangladesh, Dhaka</td>
                                                <td>
                                                    <span>
                                                        <i className="ri-check-line text-success me-1"></i>
                                                    </span>
                                                    <span>
                                                        <i className="ri-close-line text-danger"></i>
                                                    </span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>1 day ago</td>
                                                <td>Chrome (Windows)</td>
                                                <td>250.364.239.254</td>
                                                <td>Bangladesh, Dhaka</td>
                                                <td>
                                                    <span>
                                                        <i className="ri-check-line text-success me-1"></i>
                                                    </span>
                                                    <span>
                                                        <i className="ri-close-line text-danger"></i>
                                                    </span>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        <div className="card">
                            <div className="card-header">
                                <h4 className="card-title">
                                    Confirmed Devices
                                </h4>

                                <small>
                                    These devices are currently allowed to
                                    access your account. Remove all other
                                    devices
                                </small>
                            </div>
                            <div className="card-body">
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>Confirmed</th>
                                                <th>Browser</th>
                                                <th>IP Address</th>
                                                <th>Near</th>
                                                <th>Current</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>1 day ago</td>
                                                <td>Chrome (Windows)</td>
                                                <td> 250.364.239.254</td>
                                                <td>Bangladesh, Dhaka</td>
                                                <td>
                                                    <span>
                                                        <i className="ri-check-line text-success me-1"></i>
                                                    </span>
                                                    <span>
                                                        <i className="ri-close-line text-danger"></i>
                                                    </span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>8 days ago</td>
                                                <td>Chrome (Windows)</td>
                                                <td> 250.364.239.254</td>
                                                <td>Bangladesh, Dhaka</td>

                                                <td>
                                                    <span>
                                                        <i className="ri-check-line text-success me-1"></i>
                                                    </span>
                                                    <span>
                                                        <i className="ri-close-line text-danger"></i>
                                                    </span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>15 days ago</td>
                                                <td>Chrome (Windows)</td>
                                                <td> 250.364.239.254</td>
                                                <td>Bangladesh, Dhaka</td>

                                                <td>
                                                    <span>
                                                        <i className="ri-check-line text-success me-1"></i>
                                                    </span>
                                                    <span>
                                                        <i className="ri-close-line text-danger"></i>
                                                    </span>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        <div className="card">
                            <div className="card-header">
                                <h4 className="card-title">Account Activity</h4>

                                <small>Recent activity on your account.</small>
                            </div>
                            <div className="card-body">
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>Action</th>
                                                <th>Source</th>
                                                <th>IP Address</th>
                                                <th>Location</th>
                                                <th>When</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>verified second factor</td>
                                                <td>api</td>
                                                <td>157.119.239.254</td>
                                                <td>Bangladesh</td>
                                                <td>
                                                    
                                                        about 1 hour ago
                                                    
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>verified second factor</td>
                                                <td>api</td>
                                                <td>157.119.239.254</td>
                                                <td>Bangladesh</td>
                                                <td>
                                                    
                                                        about 2 hours ago
                                                    
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>second factor failure</td>
                                                <td>api</td>
                                                <td>157.119.239.254</td>
                                                <td>Bangladesh</td>
                                                <td>
                                                    
                                                        about 2 hours ago
                                                    
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    device confirmation
                                                    completed
                                                </td>
                                                <td>web</td>
                                                <td>157.119.239.254</td>
                                                <td>Bangladesh</td>
                                                <td>
                                                    1 day ago
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>signin</td>
                                                <td>web</td>
                                                <td>157.119.239.254</td>
                                                <td>Bangladesh</td>
                                                <td>
                                                    1 day ago
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>verified second factor</td>
                                                <td>web</td>
                                                <td>157.119.239.254</td>
                                                <td>Bangladesh</td>
                                                <td>
                                                    1 day ago
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>signout</td>
                                                <td>web</td>
                                                <td>157.119.239.214</td>
                                                <td>Bangladesh</td>
                                                <td>
                                                    8 days ago
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>signin</td>
                                                <td>web</td>
                                                <td>157.119.239.214</td>
                                                <td>Bangladesh</td>
                                                <td>
                                                    8 days ago
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>verified second factor</td>
                                                <td>web</td>
                                                <td>157.119.239.214</td>
                                                <td>Bangladesh</td>
                                                <td>
                                                    8 days ago
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>signout</td>
                                                <td>api</td>
                                                <td>157.119.239.214</td>
                                                <td>Bangladesh</td>
                                                <td>
                                                    8 days ago
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>signout</td>
                                                <td>api</td>
                                                <td>157.119.239.214</td>
                                                <td>Bangladesh</td>
                                                <td>
                                                    8 days ago
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    device confirmation
                                                    completed
                                                </td>
                                                <td>web</td>
                                                <td>157.119.239.214</td>
                                                <td>Bangladesh</td>
                                                <td>
                                                    8 days ago
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>signin</td>
                                                <td>web</td>
                                                <td>157.119.239.214</td>
                                                <td>Bangladesh</td>
                                                <td>
                                                    8 days ago
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>verified second factor</td>
                                                <td>web</td>
                                                <td>157.119.239.214</td>
                                                <td>Bangladesh</td>
                                                <td>
                                                    8 days ago
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>signout</td>
                                                <td>api</td>
                                                <td>157.119.239.214</td>
                                                <td>Bangladesh</td>
                                                <td>
                                                    15 days ago
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>verified second factor</td>
                                                <td>web</td>
                                                <td>157.119.239.214</td>
                                                <td>Bangladesh</td>
                                                <td>
                                                    15 days ago
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>signin</td>
                                                <td>web</td>
                                                <td>157.119.239.214</td>
                                                <td>Bangladesh</td>
                                                <td>
                                                    15 days ago
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>signout</td>
                                                <td>api</td>
                                                <td>157.119.239.214</td>
                                                <td>Bangladesh</td>
                                                <td>
                                                    15 days ago
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>verified second factor</td>
                                                <td>web</td>
                                                <td>23.106.249.39</td>
                                                <td>Singapore</td>
                                                <td>
                                                    15 days ago
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>verified second factor</td>
                                                <td>api</td>
                                                <td>157.119.239.214</td>
                                                <td>Bangladesh</td>
                                                <td>
                                                    15 days ago
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>phone verified</td>
                                                <td>api</td>
                                                <td>157.119.239.214</td>
                                                <td>Bangladesh</td>
                                                <td>
                                                    15 days ago
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>phone added</td>
                                                <td>api</td>
                                                <td>157.119.239.214</td>
                                                <td>Bangladesh</td>
                                                <td>
                                                    15 days ago
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>signin</td>
                                                <td>api</td>
                                                <td>157.119.239.214</td>
                                                <td>Bangladesh</td>
                                                <td>
                                                    15 days ago
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        <div className="card transparent">
                            <div className="card-header">
                                <h4 className="card-title">Close Account</h4>
                            </div>
                            <div className="card-body">
                                <p>
                                    Withdraw funds and close your Xtrader
                                    account -{" "}
                                    <span className="text-danger">
                                        this cannot be undone
                                    </span>
                                </p>
                                    Close Account
                                
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
}
export default SettingsActivity;
