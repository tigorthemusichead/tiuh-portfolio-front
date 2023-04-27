import {ReactNode} from "react";
import Link from "next/link";
import {NAV_BAR, SOCIALS} from "@/constants";
import shortid from "shortid"
import {useRouter} from "next/router";
import Logo from "@/components/elements/logo";
import { Raleway } from 'next/font/google';

const ralewayScript = Raleway({ subsets: ['latin'] });
interface LayoutProps {
    children: ReactNode
}
const Layout = (props: LayoutProps) => {
    const {asPath} = useRouter();
    console.log(asPath)
    return (
        <div className={`min-h-screen w-full bg-white flex flex-col justify-between ${ralewayScript.className}`}>
            <div className={"h-full w-full max-w-7xl mx-auto flex-1"}>
                <header className={"flex justify-between py-5 px-10 content-center"}>
                    <Logo/>
                    <nav className={"flex gap-10 flex-col sm:flex-row"}>
                        {
                            NAV_BAR.map((item) => (
                                <Link href={item.href}
                                      key={shortid.generate()}
                                      className={`${asPath === item.href ? "font-semibold" : "font-normal"} hover:underline`}
                                >
                                    {item.label}
                                </Link>
                            ))
                        }
                    </nav>
                </header>
                { props.children }
            </div>
            <footer className={"bg-gray-100 h-fit px-10 sm:px-40 py-10"}>
                <div className={"h-full w-full max-w-7xl mx-auto flex sm:flex-row flex-col gap-10 justify-between"}>
                    <div className={"flex flex-col justify-between gap-10"}>
                        <Link href={"/"} className={"font-black h-fit"}>
                            <img src="/logo.png" alt="" className={"h-20"}/>
                        </Link>
                        <div className={"flex gap-5"}>
                            {
                                SOCIALS.map(item => <Link href={item.href} key={shortid.generate()}><item.element/></Link>)
                            }
                        </div>
                    </div>
                    <nav className={"flex gap-10 flex-col"}>
                        {
                            NAV_BAR.map((item) => (
                                <Link href={item.href}
                                      key={shortid.generate()}
                                      className={`${asPath === item.href ? "font-bold" : "font-normal"} hover:underline`}
                                >
                                    {item.label}
                                </Link>
                            ))
                        }
                    </nav>
                    </div>
            </footer>
        </div>
    )
}

export default Layout;