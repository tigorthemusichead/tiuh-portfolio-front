import axios from "axios";
import {API_URL} from "@/constants";
import shortid from "shortid";
import ProjectCard from "@/components/elements/project-card";

interface ProjectsProps {
    data: any;
}
const Projects = (props: ProjectsProps) => {
    return(
        <main className={"p-10 sm:p-20 grid grid-cols-1 sm:grid-cols-3 gap-10"}>
            {props.data.data.map((item: any) => (
                    <ProjectCard key={shortid.generate()} data={item}/>
                )
            )}
        </main>
    )
}

export const getStaticProps = async () => {
    try {
        const response = await axios.get(`${API_URL}/api/projects?populate=deep`);
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

export default Projects;