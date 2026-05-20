import api from "./axios";
import type { Lead, LeadFilters, LeadsResponse } from "../types/lead";

export async function fetchLeads(filters: LeadFilters): Promise<LeadsResponse> {
  const params: Record<string, string> = {
    page: String(filters.page),
    limit: String(filters.limit),
    sortBy: filters.sortBy,
    order: filters.order,
  };

  if (filters.search.trim()) params.search = filters.search.trim();
  if (filters.status) params.status = filters.status;
  if (filters.source.trim()) params.source = filters.source.trim();

  const { data } = await api.get<LeadsResponse>("/api/leads", { params });
  return data;
}

export async function createLead(
  payload: Partial<Lead>
): Promise<{ message: string; lead: Lead }> {
  const { data } = await api.post("/api/leads", payload);
  return data;
}

export async function updateLead(
  id: string,
  payload: Partial<Lead>
): Promise<{ message: string; lead: Lead }> {
  const { data } = await api.put(`/api/leads/${id}`, payload);
  return data;
}

export async function deleteLead(id: string): Promise<{ message: string }> {
  const { data } = await api.delete(`/api/leads/${id}`);
  return data;
}
