import { Box, FormControl, MenuItem, Select, TextField, type SelectChangeEvent } from "@mui/material";
import { useEffect, useState } from "react";
import type { ProjectDisplayDto } from "../../../persistence/ProjectDisplayDto";

// Default value for projectData, in case it can not be loaded
export default function NavbarSelector({projectDisplayData = []} : {projectDisplayData:ProjectDisplayDto[]}) {
    const[selectedProject, setSelectedProject] = useState<ProjectDisplayDto | undefined>(projectDisplayData[0]);


    useEffect(() => {
        if (projectDisplayData.length > 0) {
            setSelectedProject(projectDisplayData[0]);
        }
    }, [projectDisplayData]);

    const handleSelectChange = (e: SelectChangeEvent<string>) => {
        const selectedId = e.target.value;
        const selectedProj = projectDisplayData.find((project) => project.id === selectedId);
        setSelectedProject(selectedProj);
    };
    

    return (
    <Box sx={{display: "flex", flexDirection: "row", columnGap: 4, minWidth:200}}>
        <FormControl size="small">
            <Select
            sx={{backgroundColor:"background.paper", width:200, textAlign:"left"}}
                labelId="Projekte"
                id="projects"   
                value={selectedProject?.id ?? ""}
                onChange={handleSelectChange}
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
            >
                {projectDisplayData.map((project) => (
                    <MenuItem value={project.id}>{project.name}</MenuItem>
                ))}
            </Select>
        </FormControl>
        <TextField
            /* 
             * Careful, this is extra css so that the corners of the TextArea also have the BG Color; otherwise they'd be white
             * This might be due to the way Material UI is coded, idk, but this fixes it! used it on the second textarea aswell
             */
            sx={{backgroundColor: "#457b9d",
                  "& .MuiInputBase-root": {
                    backgroundColor: "background.paper", 
                  }}}
            name="projectmanager"
            value={selectedProject?.projektleiter ?? "Projektleiter*In"}
            disabled={true}
            size="small"
        />
        <TextField
           sx={{width:500, backgroundColor: "#457b9d", 
                "& .MuiInputBase-root": {
                  backgroundColor: "background.paper"
                }
              }}
            name="projectdescription"
            value={selectedProject?.beschreibung ?? "Beschreibung"}
            disabled={true}
            size="small"
        />
    </Box>
    )
}