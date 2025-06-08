import { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Container,
  Typography,
} from "@mui/material";
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
  const [editingData, setEditingData] = useState<InvestmentDto>(emptyInvestment);
  const [investments, setInvestments] = useState<InvestmentDto[]>([]);
  const [modalOpen, setModalOpen] = useState(false);

  // Add state for selected project
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);

  useEffect(() => {
    fetchProjectData();
    fetchCategories();
    fetchInvestments();
  }, []);

  const fetchProjectData = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/projects");
      const data = await res.json();
      data.sort((a, b) => a.name.localeCompare(b.name));
      setProjectData(data);
      if (data.length > 0) setSelectedProjectId(data[0].id); // default to first project
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/finance/categories");
      const data = await res.json();
      setCategories(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchInvestments = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/finance");
      const data = await res.json();
      setInvestments(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (data: InvestmentDto): Promise<boolean> => {
    if (!selectedProjectId) {
      console.error("No project selected!");
      return false;
    }

    // Add projectId to the investment data before sending
    const dataWithProject = { ...data, projectId: selectedProjectId };

    try {
      const res = await fetch("http://localhost:8080/api/finance", {
        method: dataWithProject.id ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataWithProject),
      });
      if (!res.ok) throw new Error("Failed to save");
      const saved = await res.json();

      setInvestments((prev) => {
        const existing = prev.find((inv) => inv.id === saved.id);
        if (existing) {
          return prev.map((inv) => (inv.id === saved.id ? saved : inv));
        } else {
          return [...prev, saved];
        }
      });

      setModalOpen(false);
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

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
          top: 64,
          backgroundColor: nb_selectorColor,
          zIndex: (theme) => theme.zIndex.appBar,
        }}
      >
        <Toolbar>
          <NavbarSelector
            projectDisplayData={projectData.map(mapToProjectDisplay)}
            selectedProjectId={selectedProjectId}
            onProjectSelect={(id: number) => setSelectedProjectId(id)}
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
