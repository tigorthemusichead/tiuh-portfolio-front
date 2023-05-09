import axios from "axios";
import {API_URL} from "@/constants";
import ReactMarkdown from 'react-markdown'

interface AboutProps {
    data: any
}
const About = (props: AboutProps) => {
    return (
        <main className={"p-10 w-full sm:p-20"}>
            <ReactMarkdown className={"redactor"}>
                {props.data.data.attributes.text}
            </ReactMarkdown>
        </main>
    )
}

export default About;

export const getStaticProps = async () => {
    try {
        const response = await axios.get(`${API_URL}/api/about?populate=deep`);
        return {
            props: {
                data: response.data
            }
        }
    } catch (err) {
        return {
            notFound: true
        }
    }
}