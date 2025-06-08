import { formatDate } from "../utils/date-formatter";
import type { CategoryDto } from "./CategoryDto"

export type InvestmentDto = {
    id: string,
    date: string,
    name: string,
    category: CategoryDto,
    amount: string, 
    loaner: string,
    notes: string,
    projectId: string,
}

export const emptyInvestment: InvestmentDto = {
  id: '',
  date: formatDate(new Date()),
  name: '',
  category: { id: '', name: '' },
  amount: '',
  loaner: '',
  notes: '',
  projectId: ''
};