import { Box, FormControl, MenuItem, Select, TextField, type SelectChangeEvent } from "@mui/material";
import { useEffect, useState } from "react";
import type { ProjectDisplayDto } from "../../../persistence/ProjectDisplayDto";

type FinanceNavbarProps = {
  projectDisplayData: ProjectDisplayDto[];
  onProjectSelect: (projectId: string) => void; // callback prop
};

export default function FinanceNavbar({ projectDisplayData = [], onProjectSelect }: FinanceNavbarProps) {
  const [selectedProject, setSelectedProject] = useState<ProjectDisplayDto | undefined>(projectDisplayData[0]);

  useEffect(() => {
    if (projectDisplayData.length > 0) {
      setSelectedProject(projectDisplayData[0]);
      onProjectSelect(projectDisplayData[0].id); // notify parent of initial selection
    }
  }, [projectDisplayData, onProjectSelect]);

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const selectedId = e.target.value;
    const selectedProj = projectDisplayData.find((project) => project.id === selectedId);
    setSelectedProject(selectedProj);
    onProjectSelect(selectedId); // notify parent of change
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "row", columnGap: 4, minWidth: 200 }}>
      <FormControl size="small">
        <Select
          sx={{ backgroundColor: "background.paper", width: 200, textAlign: "left" }}
          labelId="Projekte"
          id="projects"
          value={selectedProject?.id ?? ""}
          onChange={handleSelectChange}
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
        >
          {projectDisplayData.map((project) => (
            <MenuItem key={project.id} value={project.id}>
              {project.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        sx={{
          backgroundColor: "#457b9d",
          "& .MuiInputBase-root": {
            backgroundColor: "background.paper",
          },
        }}
        name="projectmanager"
        value={selectedProject?.projektleiter ?? "Projektleiter*In"}
        disabled={true}
        size="small"
      />
      <TextField
        sx={{
          width: 500,
          backgroundColor: "#457b9d",
          "& .MuiInputBase-root": {
            backgroundColor: "background.paper",
          },
        }}
        name="projectdescription"
        value={selectedProject?.beschreibung ?? "Beschreibung"}
        disabled={true}
        size="small"
      />
    </Box>
  );
}
