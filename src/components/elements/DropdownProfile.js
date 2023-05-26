import Link from "next/link";
function DropdownProfile() {
    const notificationList = [
        {
            icon: "ri-user-line",
            text: "Profile",
            path: "profile",
        },
        {
            icon: "ri-settings-3-line",
            text: "Settings",
            path: "settings-profile",
        },
        {
            icon: "ri-time-line",
            text: "Activity",
            path: "settings-activity",
        },
        {
            icon: "ri-lock-line",
            text: "Lock",
            path: "lock",
        },
        {
            icon: "ri-logout-circle-line",
            text: "Logout",
            path: "signin",
            color: "text-danger",
        },
    ];

    return (
        <>
            {notificationList.map((item, id) => (
                <>
                    <Link href={`/${item.path}`} key={id}>

                            <span className="fs-18 text-primary me-10">
                                <i className={item.icon}></i>
                            </span>
                            {item.text}
                        
                    </Link>
                </>
            ))}
        </>
    );
}
export default DropdownProfile;
