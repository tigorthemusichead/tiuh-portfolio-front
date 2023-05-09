import axios from "axios";
import {API_URL} from "@/constants";
import ReactMarkdown from "react-markdown";
import {Gallery, Item} from "react-photoswipe-gallery";
import shortid from "shortid";
import {Fragment} from "react";

interface ProjectProps {
    data: any
}
const Project = ({data} : ProjectProps) => {
    return(
        <main className={"p-10 w-full sm:p-20 redactor"}>
            <h2>{data.data.attributes.title}</h2>
            <ReactMarkdown>
                {data.data.attributes.description}
            </ReactMarkdown>
            <Gallery>
                <div className={"flex flex-col sm:flex-row gap-10"}>
                    {
                        [0, 1, 2].map((columnIndex) => (
                            <div className={"flex flex-col gap-10"}
                                 key={shortid.generate()}
                            > {
                                data.data.attributes.images.data.map((item: any, index: number) => (
                                    index % 3 === columnIndex ?
                                        <div key={shortid.generate()} className={"sm:w-full"}>
                                            <Item
                                                original={`${API_URL}${item.attributes.url}`}
                                                thumbnail={`${API_URL}${item.attributes.formats.thumbnail.url}`}
                                                height={item.attributes.height}
                                                width={item.attributes.width}
                                            >
                                                {({ ref, open }) => (
                                                    <>
                                                        {//@ts-ignore
                                                            <img ref={ref}
                                                                 className={"cursor-pointer w-full"}
                                                                 onClick={open}
                                                                 crossOrigin={"anonymous"}
                                                                 src={`${API_URL}${item.attributes.formats.small.url}`}
                                                            />
                                                        }
                                                        {/*<div className={"mt-2 text-center"}>
                                                {item.attributes.title}
                                            </div>*/}
                                                    </>
                                                )}
                                            </Item>
                                        </div> : <Fragment key={shortid.generate()}/>
                                ))}
                            </div>
                        ))
                    }
                </div>
            </Gallery>
        </main>
    )
}

export default Project;

export const getStaticProps = async ({params}: any) => {
    const { id } = params;
    try {
        const response = await axios.get(`${API_URL}/api/projects/${id}?populate=deep`);
        return {
            props: {
                data: response.data
            }
        }
    } catch (err) {
        return { notFound: true };
    }
}

export async function getStaticPaths() {
    if (process.env.SKIP_BUILD_STATIC_GENERATION) {
        return {
            paths: [],
            fallback: 'blocking',
        }
    }
    const response = await axios.get(`${API_URL}/api/projects?populate=deep`);
    const paths = response.data.data.map((item: any) => ({
        params: { id: `${item.id}` },
    }))
    return { paths, fallback: false }
}