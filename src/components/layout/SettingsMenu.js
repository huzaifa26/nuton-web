import Link from "next/link";
import { useRouter } from "next/router";

function SettingsMenu() {
    const router = useRouter();
    return (
        <>
            <ul className="settings-menu">
                <li
                    className={
                        router.pathname == "/settings-profile" ? "active" : ""
                    }
                >
                    <Link href="/settings-profile">
                        <i className="ri-arrow-right-s-line"></i> Profile
                    </Link>
                </li>
                <li
                    className={
                        router.pathname == "/settings-application"
                            ? "active"
                            : ""
                    }
                >
                    <Link href="/settings-application">
                        <i className="ri-arrow-right-s-line"></i> Application
                    </Link>
                </li>
                {/* <li
                    className={
                        router.pathname == "/settings-security" ? "active" : ""
                    }
                >
                    <Link href="/settings-security">
                        <i className="ri-arrow-right-s-line"></i> Security
                    </Link>
                </li> */}
                {/* <li
                    className={
                        router.pathname == "/settings-activity" ? "active" : ""
                    }
                >
                    <Link href="/settings-activity">
                        <i className="ri-arrow-right-s-line"></i> Activity
                    </Link>
                </li> */}
                <li
                    className={
                        router.pathname == "/settings-payment-method"
                            ? "active"
                            : ""
                    }
                >
                    <Link href="/settings-payment-method">
                        <i className="ri-arrow-right-s-line"></i> Payment Method
                    </Link>
                </li>
                {/* <li
                    className={
                        router.pathname == "/settings-api" ? "active" : ""
                    }
                >
                    <Link href="/settings-api">
                        <i className="ri-arrow-right-s-line"></i> API
                    </Link>
                </li> */}
            </ul>
        </>
    );
}
export default SettingsMenu;
