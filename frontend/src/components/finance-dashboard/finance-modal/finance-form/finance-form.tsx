import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  type SelectChangeEvent,
} from "@mui/material";
import type { CategoryDto } from "../../../../persistence/CategoryDto";
import type { InvestmentDto } from "../../../../persistence/InvestmentDto";
import { useState, type ChangeEvent, useEffect } from "react";

type FinanceProps = {
  editingData: InvestmentDto;
  setEditingData: React.Dispatch<React.SetStateAction<InvestmentDto>>;
  categoryData: CategoryDto[];
};

export default function FinanceForm({
  editingData,
  setEditingData,
  categoryData,
}: FinanceProps) {
  const [tempData, setTempData] = useState<InvestmentDto>(editingData);

  useEffect(() => {
    setTempData(editingData);
  }, [editingData]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const updated = { ...tempData, [name]: value };
    setTempData(updated);
    setEditingData(updated);
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    const selectedCategory = categoryData.find((cat) => cat.id === value);
    const updated = {
      ...tempData,
      [name]: selectedCategory ?? { id: "", name: "" },
    };
    setTempData(updated);
    setEditingData(updated); 
  };

  return (
    <Box>
      <TextField
        label="Bezeichnung"
        name="name"
        value={tempData.name}
        onChange={handleChange}
        size="small"
        required
        fullWidth
        margin="normal"
      />
      <FormControl required size="small" fullWidth margin="normal">
        <InputLabel id="category-label">Kategorie</InputLabel>
        <Select
          labelId="category-label"
          id="category"
          name="category"
          value={tempData.category.id}
          label="Kategorie"
          onChange={handleSelectChange}
        >
          {categoryData.map((category) => (
            <MenuItem key={category.id} value={category.id}>
              {category.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        label="Datum"
        name="date"
        value={tempData.date}
        onChange={handleChange}
        size="small"
        required
        fullWidth
        margin="normal"
        type="date"
      />
      <TextField
        label="Geldgeber"
        name="loaner"
        value={tempData.loaner}
        onChange={handleChange}
        size="small"
        fullWidth
        margin="normal"
      />
      <TextField
        label="Betrag"
        name="amount"
        value={tempData.amount}
        onChange={handleChange}
        size="small"
        required
        fullWidth
        margin="normal"
        type="number"
      />
      <TextField
        label="Notizen"
        name="notes"
        value={tempData.notes}
        onChange={handleChange}
        size="small"
        fullWidth
        multiline
        margin="normal"
      />
    </Box>
  );
}
