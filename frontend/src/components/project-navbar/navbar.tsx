import { useEffect, useState } from "react";
import NavbarHeader from "./navbar-header/navbar-header";
import NavbarSelector from "./navbar-selector/navbar-selector";
import type { ProjectDto } from "../../persistence/ProjectDto";
import { mapToProjectDisplay } from "../../persistence/mapper";
import { AppBar, Toolbar } from "@mui/material";

export default function Navbar() {
    const [projectData, setProjectData] = useState<ProjectDto[]>([]);
    
    useEffect(() => {
        fetchProjectData();
    }, []);

    const fetchProjectData = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/projects');
            const data: ProjectDto[] = await response.json();
            data.sort((a, b) => a.name.localeCompare(b.name)); // alphabetical sorting of the name
            setProjectData(data);
        } catch (error) {
            console.error(error);
        }
    }


    return (
        <AppBar position="fixed">
            <Toolbar sx={{backgroundColor:"#264653"}}>
                <NavbarHeader navbarTitle={"Valemus Assessment"} />
            </Toolbar>
            <Toolbar sx={{backgroundColor:"#457b9d"}}>
                <NavbarSelector projectDisplayData={projectData.map(mapToProjectDisplay)} />
            </Toolbar>
        </AppBar>
    )
}