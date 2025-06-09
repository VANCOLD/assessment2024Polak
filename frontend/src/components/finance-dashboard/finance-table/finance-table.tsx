// FinanceTable.tsx
import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography } from "@mui/material";
import CommentIcon from '@mui/icons-material/Comment';
import type { InvestmentDto } from "../../../persistence/InvestmentDto";

export default function FinanceTable({ investments, onEdit }: {investments: InvestmentDto[], onEdit: (investment: InvestmentDto) => void}) {
  return (
    <Box mt={10}>
      <Typography variant="h6" gutterBottom>
        Erfasste Geldeinlagen
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Zeilennummer</TableCell>
              <TableCell>Datum</TableCell>
              <TableCell>Bezeichnung</TableCell>
              <TableCell>Kategorie</TableCell>
              <TableCell>Betrag</TableCell>
              <TableCell>Geldgeber</TableCell>
              <TableCell>Notizen</TableCell>
              <TableCell>&Ouml;ffnen</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {investments.map((inv) => (
              <TableRow key={inv.id}>
                <TableCell>{inv.id}</TableCell>
                <TableCell>{inv.date.replaceAll('-','.')}</TableCell>
                <TableCell>{inv.name}</TableCell>
                <TableCell>{inv.category.name}</TableCell>
                <TableCell>{inv.amount}</TableCell>
                <TableCell>{inv.loaner}</TableCell>
                <TableCell>
                  {inv.notes.trim().length > 0 && (
                    <Tooltip title={inv.notes} enterDelay={100}>
                      <CommentIcon />
                    </Tooltip>
                  )}
                </TableCell>
                <TableCell>
                  <Button onClick={() => onEdit(inv)}>Bearbeiten</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}