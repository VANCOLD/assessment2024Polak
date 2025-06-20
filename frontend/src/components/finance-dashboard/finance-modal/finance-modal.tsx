import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import FinanceForm from "./finance-form/finance-form";
import type { CategoryDto } from "../../../persistence/CategoryDto";
import type { InvestmentDto } from "../../../persistence/InvestmentDto";

// I want to set the types and this is the easiest way to do it without having messy looking code
type FinanceModalProps = {
  open: boolean;
  onClose: () => void;
  onSave: (editingData: InvestmentDto) => void;
  onAbort: () => void;
  editingData: InvestmentDto;
  setEditingData: React.Dispatch<React.SetStateAction<InvestmentDto>>;
  categoryData: CategoryDto[];
};

export default function FinanceModal({ open, onClose, onSave, onAbort, editingData, setEditingData, categoryData }: FinanceModalProps) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>
        {editingData?.id ? "Finanzierung bearbeitenNeue Geldeinlage erfassen" : "Neue Geldeinlage"}
      </DialogTitle>
      <DialogContent>
        {editingData && (
          <FinanceForm
            editingData={editingData}
            setEditingData={setEditingData}
            categoryData={categoryData}
          />
        )}
      </DialogContent>
        <DialogActions>
        <Button onClick={onAbort}>Abbrechen</Button>
            <Button onClick={() => onSave(editingData)}>Speichern</Button>
        </DialogActions>
    </Dialog>
  );
}