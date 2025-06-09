import { Box, FormControl, MenuItem, Select, TextField, type SelectChangeEvent } from "@mui/material";
import type { ProjectDisplayDto } from "../../../persistence/ProjectDisplayDto";

// Using a custom type here aswell, makes the typing easier / more readable
type FinanceNavbarProps = {
  projectDisplayData: ProjectDisplayDto[];
  selectedProjectId: string | null;
  onProjectSelect: (projectId: string) => void;
};

export default function FinanceNavbar({ projectDisplayData = [], selectedProjectId, onProjectSelect }: FinanceNavbarProps) {
  const selectedProject = projectDisplayData.find((project) => project.id === selectedProjectId);

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    onProjectSelect(e.target.value); // no need for local state
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "row", columnGap: 4, minWidth: 200 }}>
      <FormControl size="small">
        <Select
          sx={{ backgroundColor: "background.paper", width: 200, textAlign: "left" }}
          labelId="Projekte"  
          id="projects"
          value={selectedProjectId ?? ""}
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
          "& .MuiInputBase-root": { backgroundColor: "background.paper" }, // used to get rid of white corners
        }}
        name="projectmanager"
        value={selectedProject?.projektleiter ?? "Projektleiter*In"}
        disabled
        size="small"
      />
      <TextField
        sx={{
          width: 500,
          backgroundColor: "#457b9d",
          "& .MuiInputBase-root": { backgroundColor: "background.paper" },  // used to get rid of white corners
        }}
        name="projectdescription"
        value={selectedProject?.beschreibung ?? "Beschreibung"}
        disabled
        size="small"
      />
    </Box>
  );
}