import FormInput from "@/components/elements/form-input";
import {useState} from "react";
import axios from "axios";
import {API_URL} from "@/constants"
import joi from "joi";
import _ from "lodash";

interface ContactProps {
    data: any
}

const Contact = (props: ContactProps) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [formError, setFormError] = useState("");
    const send = async () => {
        if (validate() !== undefined ) {
            return;
        }
        const text = `${name}\n\n${message}`;
        const DTO = {
            to: email,
            text: text
        }
        try {
            const response = await axios.post(`${API_URL}/api/email`, DTO);
            console.log(response)
        } catch (err) {
            console.warn(err)
        }
    }
    const validate = () => {
        const schema = joi.object({
            name: joi.string(),
            email: joi.string().email({ tlds: { allow: false } }),
            message: joi.string()
        });
        const { value, error} = schema.validate({
            name,
            email,
            message
        });
        for (let key in value) {
            if (_.includes(`${error}`, key)) {
                setFormError(key);
                break;
            } else if (formError !== "") {
                setFormError("");
            }
        }
        return error;
    }

    return (
        <main className={"p-10 w-full sm:p-20 flex flex-col-reverse sm:flex-row justify-around gap-10"}>
            <form className={"flex flex-col gap-5"}>
                <FormInput
                    label={"Your name"}
                    type={"text"}
                    value={name}
                    error={formError === "name"}
                    //@ts-ignore
                    onChange={(e) => setName(e.target.value)}
                />
                <FormInput
                    label={"Your email"}
                    type={"email"}
                    value={email}
                    error={formError === "email"}
                    //@ts-ignore
                    onChange={(e) => setEmail(e.target.value)}
                />
                <FormInput
                    label={"Your message"}
                    type={"text"}
                    value={message}
                    multiline
                    error={formError === "message"}
                    //@ts-ignore
                    onChange={(e) => setMessage(e.target.value)}
                />
                <div className={"h-10 w-40 bg-gray-100 flex justify-center items-center border-solid border-2 border-gray-200 hover:border-gray-300 active:border-gray-400 cursor-pointer ease-linear duration-200 text-gray-600 active:text-gray-400"}>
                    <div
                        className={" block h-fit select-none"}
                        onClick={send}
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
    try {
        const response = await axios.get(`${API_URL}/api/contact?populate=deep`);
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