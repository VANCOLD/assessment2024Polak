import { useEffect, useState } from "react";
import { AppBar, Toolbar, Button, Container, Typography } from "@mui/material";
import NavbarSelector from "./finance-navbar/finance-navbar";
import type { CategoryDto } from "../../persistence/CategoryDto";
import type { ProjectDto } from "../../persistence/ProjectDto";
import type { InvestmentDto } from "../../persistence/InvestmentDto";
import { emptyInvestment } from "../../persistence/InvestmentDto";
import { mapToProjectDisplay } from "../../persistence/mapper";
import FinanceTable from "./finance-table/finance-table";
import FinanceModal from "./finance-modal/finance-modal";

const nb_selectorColor = "#457b9d";

export default function FinanceDashboard() {
  const [projectData, setProjectData] = useState<ProjectDto[]>([]);
  const [categories, setCategories] = useState<CategoryDto[]>([]);
  const [investments, setInvestments] = useState<InvestmentDto[]>([]);
  const [editingData, setEditingData] = useState<InvestmentDto>(emptyInvestment);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  // regular useEffect, used for fetching 
  useEffect(() => {
    fetchProjectData();
    fetchCategories();
  }, []);

  // use effect updates the investments once someone selects a project!
  useEffect(() => {
    if (selectedProjectId) {
      fetchInvestments(selectedProjectId);
    }
  }, [selectedProjectId]);


  const fetchProjectData = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/projects");
      const data = await res.json();
      data.sort((a, b) => a.name.localeCompare(b.name)); // sorting alphabetical before storing!
      setProjectData(data);
      if (data.length > 0) setSelectedProjectId(data[0].id);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };


  const fetchCategories = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/finance/categories");
      const data = await res.json();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };


const fetchInvestments = async (projectId: string | null) => {
  if (!projectId) return; // if we dont have a projectId just do nothing

  try {
    const res = await fetch(`http://localhost:8080/api/finance/${projectId}`);
    const data = await res.json();
    setInvestments(data);
  } catch (error) {
    console.error("Error fetching investments:", error);
  }
};


  const handleSubmit = async (data: InvestmentDto): Promise<boolean> => {
    if (!selectedProjectId) { // failsafe
      console.error("No project selected!");
      return false;
    }

    const dataWithProject = { ...data, projectId: selectedProjectId }; // request body

    try {
      const res = await fetch("http://localhost:8080/api/finance", {
        method: dataWithProject.id ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataWithProject),
      });

      if (!res.ok) throw new Error("Failed to save investment");
      const saved = await res.json();

      setInvestments((prev) => {
        const existing = prev.find((inv) => inv.id === saved.id);
        return existing
          ? prev.map((inv) => (inv.id === saved.id ? saved : inv))
          : [...prev, saved];
      });

      setModalOpen(false);
      return true;
    } catch (err) {
      console.error("Error saving investment:", err);
      return false;
    }
  };


  // Modal based stuff
  const handleEdit = (investment: InvestmentDto) => {
    setEditingData(investment);
    setModalOpen(true);
  };

  const handleCreate = () => {
    setEditingData(emptyInvestment);
    setModalOpen(true);
  };

  const handleAbort = () => {
    setEditingData(emptyInvestment);
    setModalOpen(false);
  };


  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          top: 64, // if i didnt put this here both appbars would overlap
          backgroundColor: nb_selectorColor,
          zIndex: (theme) => theme.zIndex.appBar,
        }}
      >
        <Toolbar>
          <NavbarSelector
            projectDisplayData={projectData.map(mapToProjectDisplay)}
            selectedProjectId={selectedProjectId}
            onProjectSelect={(id: string) => setSelectedProjectId(id)}
          />
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 12 }}>
        <Typography variant="h5" gutterBottom>
          Finanzübersicht
        </Typography>

        <Button variant="contained" onClick={handleCreate} sx={{ mb: 2 }}>
          Neue Geldeinlage
        </Button>

        <FinanceTable investments={investments} onEdit={handleEdit} />
      </Container>

      <FinanceModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSubmit}
        onAbort={handleAbort}
        editingData={editingData}
        setEditingData={setEditingData}
        categoryData={categories}
      />
    </>
  );
}
