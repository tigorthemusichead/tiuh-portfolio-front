import FormInput from "@/components/elements/form-input";
import {useState} from "react";
import axios from "axios";
import {API_URL} from "@/constants"
interface ContactProps {
    data: any
}

const Contact = (props: ContactProps) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    return (
        <main className={"p-10 w-full sm:p-20 flex flex-col-reverse sm:flex-row justify-around gap-10"}>
            <form className={"flex flex-col gap-5"}>
                <FormInput
                    label={"Your name"}
                    type={"text"}
                    value={name}
                    //@ts-ignore
                    onChange={(e) => setName(e.target.value)}
                />
                <FormInput
                    label={"Your email"}
                    type={"email"}
                    value={email}
                    //@ts-ignore
                    onChange={(e) => setEmail(e.target.value)}
                />
                <FormInput
                    label={"Your message"}
                    type={"text"}
                    value={message}
                    multiline
                    //@ts-ignore
                    onChange={(e) => setMessage(e.target.value)}
                />
                <div className={"h-10 w-40 bg-gray-100 flex justify-center items-center border-solid border-2 border-gray-200 hover:border-gray-300 active:border-gray-400 cursor-pointer ease-linear duration-200 text-gray-600 active:text-gray-400"}>
                    <div
                        className={" block h-fit select-none"}
                        onClick={()=> {

                        }}
                    >
                        Send message
                    </div>
                </div>
            </form>
            <div className={"w-80"}>
                <img src={`${API_URL}${props.data?.data?.attributes?.image?.data?.attributes?.formats?.small?.url || ""}`} alt=""/>
            </div>
        </main>
    )
}

export default Contact;

export const getStaticProps = async () => {
    const response = await axios.get(`${API_URL}/api/contact?populate=deep`);
    return {
        props: {
            data: response.data
        }
    }
}