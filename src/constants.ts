import InstagramIcon from '@mui/icons-material/Instagram';
import TelegramIcon from '@mui/icons-material/Telegram';
import FacebookIcon from '@mui/icons-material/Facebook';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';

export const NAV_BAR = [
    {
        label: "Portfolio",
        href: "/"
    },
    {
        label: "Projects",
        href: "/projects"
    },
    {
        label: "About",
        href: "/about"
    },
    {
        label: "Contact",
        href: "/contact"
    }
]

export const SOCIALS = [
    {
        element: InstagramIcon,
        href: ""
    },
    {
        element: TelegramIcon,
        href: ""
    },
    {
        element: FacebookIcon,
        href: ""
    },
    {
        element: AlternateEmailIcon,
        href: ""
    }
]

export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337"