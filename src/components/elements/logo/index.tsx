import Link from "next/link";

const Logo = () => {
    return (
        <Link href={"/"} className={"logo"}>
            <video autoPlay={true} loop={true} muted={true} className={"h-32 sm:h-40"}>
                <source src="/video.mp4" type="video/mp4"/>
            </video>
            <img src="/logo.png" alt="" className={"h-32 sm:h-40"} />
        </Link>
    )
}

export default Logo