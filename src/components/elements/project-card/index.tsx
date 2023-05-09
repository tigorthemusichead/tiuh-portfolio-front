import shortid from "shortid";
import {API_URL} from "@/constants";
import {useEffect, useRef, useState} from "react";
import Link from "next/link";

interface ProjectCardProps {
    data: any
}
const ProjectCard = ({data} : ProjectCardProps) => {

    return (
        <Link href={`/project/${data.id}`}>
            <div key={shortid.generate()} className={"bg-gray-100 flex flex-col pt-3 px-3 hover:underline"}>
                <div className={"h-80 max-w-80 mx-auto overflow-hidden hover:p-2 transition-all"}>
                    <img src={`${API_URL}${data.attributes.cover.data.attributes.formats.small.url}`}
                         alt=""
                    />
                </div>
                <div className={"text-center py-2"}>
                    {
                        data.attributes.title
                    }
                </div>
            </div>
        </Link>
    )
}

export default ProjectCard;