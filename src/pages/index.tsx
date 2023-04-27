import Image from 'next/image'
import { Inter } from 'next/font/google'
import axios from 'axios'
import shortid from "shortid";
import { Gallery, Item } from 'react-photoswipe-gallery'
import {Fragment} from "react";
import {API_URL} from "@/constants";
const inter = Inter({ subsets: ['latin'] })

interface HomeProps {
    data: any
}

export default function Home(props: HomeProps) {
  return (
      <Gallery>
        <main className={"p-10 sm:p-20 flex flex-col sm:flex-row gap-10"}>
            {
                [0, 1, 2].map((columnIndex) => (
                    <div className={"flex flex-col gap-10"}
                         key={shortid.generate()}
                    > {
                        props.data.data.map((item: any, index: number) => (
                            index % 3 === columnIndex ?
                            <div key={shortid.generate()} className={"sm:w-full"}>
                                <Item
                                    original={`${API_URL}${item.attributes.image.data[0].attributes.url}`}
                                    thumbnail={`${API_URL}${item.attributes.image.data[0].attributes.formats.thumbnail.url}`}
                                    height={item.attributes.image.data[0].attributes.height}
                                    width={item.attributes.image.data[0].attributes.width}
                                >
                                    {({ ref, open }) => (
                                        <>
                                            {//@ts-ignore
                                            <img ref={ref}
                                                 className={"cursor-pointer"}
                                                 onClick={open}
                                                 crossOrigin={"anonymous"}
                                                 src={`${API_URL}${item.attributes.image.data[0].attributes.formats.small.url}`}
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
        </main>
      </Gallery>
  )
}

export const getStaticProps = async () => {
    const response = await axios.get(`${API_URL}/api/works?populate=deep`);
    return {
        props: {
            data: response.data
        }
    }
}
