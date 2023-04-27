import Link from "next/link";

const Logo = () => {
    return (
        <Link href={"/"} className={"logo"}>
            <video autoPlay={true} loop={true} src="/video.mp4" className={"h-20 sm:h-40"}/>
            <img src="/logo.png" alt="" className={"h-20 sm:h-40"} />
        </Link>
    )
}

export default Logo