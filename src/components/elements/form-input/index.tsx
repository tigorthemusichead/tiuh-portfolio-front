import {ChangeEvent} from "react";

interface InputProps {
    label: string,
    value: string,
    onChange: (e: ChangeEvent) => void,
    type?: string,
    multiline?: boolean,
    error?: boolean
}

const FormInput = ({label, value, onChange, type="text", multiline=false, error=false}: InputProps) => {
    return (
        <div className={error ? "border-red-400 border-solid border border-opacity-30" : ""}>
            {
                multiline ?
                    <textarea
                        className={"outline-0 min-h-[40px] w-80 p-2 bg-gray-100 focus:drop-shadow-sm text-gray-600"}
                        rows={5}
                        value={value}
                        placeholder={label}
                        onChange={onChange}
                    /> :
                    <input
                        className={"outline-0 h-10 w-80 px-2 bg-gray-100 focus:drop-shadow-sm text-gray-600"}
                        value={value}
                        placeholder={label}
                        onChange={onChange}
                        type={type}
                    />
            }
        </div>
    )
}

export default FormInput;