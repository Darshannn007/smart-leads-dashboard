export const LEAD_STATUSES = [
  "new",
  "contacted",
  "qualified",
  "lost",
  "won",
] as const;

export type LeadStatus = (typeof LEAD_STATUSES)[number];

export interface Lead {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  status: LeadStatus;
  source?: string;
  value?: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface LeadFilters {
  page: number;
  limit: number;
  search: string;
  status: string;
  source: string;
  sortBy: string;
  order: "asc" | "desc";
}

export interface LeadsResponse {
  leads: Lead[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface LeadFormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  status: LeadStatus;
  source: string;
  value: string;
  notes: string;
}

export const emptyLeadForm = (): LeadFormData => ({
  name: "",
  email: "",
  phone: "",
  company: "",
  status: "new",
  source: "",
  value: "",
  notes: "",
});
