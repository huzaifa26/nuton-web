const { default: Link } = require("next/link");

function PageTitle({ pageTitle, pageTitleSub, parent, child }) {
    return (
        <>
            <div className="page-title">
                <div className="row align-items-center justify-content-between">
                    <div className="col-md-6">
                        <div className="page-title-content">
                            <h3>{pageTitle}</h3>
                            <p className="mb-2">{pageTitleSub}</p>
                        </div>
                    </div>
                    <div className="col-auto">
                        <div className="breadcrumbs">
                            <Link href="#">{parent} </Link>
                            <span>
                                <i className="ri-arrow-right-s-line"></i>
                            </span>
                            <Link href="#">{child}</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default PageTitle;
