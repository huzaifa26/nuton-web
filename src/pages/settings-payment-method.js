
import Layout from "../components/layout/Layout";
import SettingsMenu from "./../components/layout/SettingsMenu";
function SettingsPayment() {
    return (
        <>
            <Layout
                headTitle="Payment Method"
                pageTitle="Payment Method"
                pageTitleSub={"Welcome to Edunet Settings Payment Method page"}
                pageClass={"dashboard"}
                parent={"Settings"}
                child={"Payment Method"}
            >

                <div className="row">
                    <div className="col-md-3">
                        <SettingsMenu />
                    </div>
                    <div className="col-md-9">
                        <div className="card">
                            <div className="card-header">
                                <h4 className="card-title">Add a payment method </h4>
                            </div>
                            <div className="card-body">
                                <div className="verify-content">
                                    <div className="d-flex align-items-center">
                                        <span className="me-16 icon-circle bg-primary text-white">
                                            <i className="ri-bank-line"></i>
                                        </span>
                                        <div className="primary-number">
                                            <h5 className="mb-0">Bank of America</h5>
                                            <small>Bank **************5421</small>
                                            <br />
                                            <span className="text-success">Verified</span>
                                        </div>
                                    </div>
                                    <button className=" btn btn-outline-primary">Manage</button>
                                </div>
                                <hr className="dropdown-divider my-16" />
                                <div className="verify-content">
                                    <div className="d-flex align-items-center">
                                        <span className="me-16 icon-circle bg-primary text-white">
                                            <i className="ri-mastercard-line"></i>
                                        </span>
                                        <div className="primary-number">
                                            <h5 className="mb-0">Master Card</h5>
                                            <small>Credit Card *********5478</small>
                                            <br />
                                            <span className="text-success">Verified</span>
                                        </div>
                                    </div>
                                    <button className=" btn btn-outline-primary">Manage</button>
                                </div>

                                <div className="mt-48 d-flex justify-content-center align-items-center">
                                    <button type="button" className="btn btn-primary mx-16 my-8" data-toggle="modal"
                                        data-target="#addBank">Add New Bank</button>
                                    <button type="button" className="btn btn-success mx-16 my-8" data-toggle="modal"
                                        data-target="#addCard">Add New Card</button>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
}
export default SettingsPayment;
