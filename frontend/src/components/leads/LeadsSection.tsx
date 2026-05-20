import { useState, type FormEvent } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { fetchLeads, createLead, updateLead, deleteLead } from "../../api/leads";
import { useDebounce } from "../../hooks/useDebounce";
import { getErrorMessage } from "../../utils/getErrorMessage";
import {
  emptyLeadForm,
  type Lead,
  type LeadFilters,
  type LeadFormData,
} from "../../types/lead";
import LeadsFilters from "./LeadsFilters";
import LeadsTable from "./LeadsTable";
import Pagination from "./Pagination";
import LeadFormModal, { formToPayload, leadToForm } from "./LeadFormModal";

const defaultFilters: LeadFilters = {
  page: 1,
  limit: 10,
  search: "",
  status: "",
  source: "",
  sortBy: "createdAt",
  order: "desc",
};

export default function LeadsSection() {
  const queryClient = useQueryClient();

  const [filters, setFilters] = useState<LeadFilters>(defaultFilters);
  const [searchInput, setSearchInput] = useState("");
  const [sourceInput, setSourceInput] = useState("");

  const debouncedSearch = useDebounce(searchInput);
  const debouncedSource = useDebounce(sourceInput);

  const activeFilters: LeadFilters = {
    ...filters,
    search: debouncedSearch,
    source: debouncedSource,
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["leads", activeFilters],
    queryFn: () => fetchLeads(activeFilters),
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [editingLead, setEditingLead] = useState<Lead | null>(null);
  const [form, setForm] = useState<LeadFormData>(emptyLeadForm());

  const createMutation = useMutation({
    mutationFn: createLead,
    onSuccess: () => {
      toast.success("Lead created");
      queryClient.invalidateQueries({ queryKey: ["leads"] });
      closeModal();
    },
    onError: (err) => toast.error(getErrorMessage(err, "Could not create lead")),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<Lead> }) =>
      updateLead(id, payload),
    onSuccess: () => {
      toast.success("Lead updated");
      queryClient.invalidateQueries({ queryKey: ["leads"] });
      closeModal();
    },
    onError: (err) => toast.error(getErrorMessage(err, "Could not update lead")),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteLead,
    onSuccess: () => {
      toast.success("Lead deleted");
      queryClient.invalidateQueries({ queryKey: ["leads"] });
    },
    onError: (err) => toast.error(getErrorMessage(err, "Could not delete lead")),
  });

  function updateFilters(partial: Partial<LeadFilters>) {
    setFilters((prev) => ({ ...prev, ...partial, page: partial.page ?? 1 }));
  }

  function openCreateModal() {
    setEditingLead(null);
    setForm(emptyLeadForm());
    setModalOpen(true);
  }

  function openEditModal(lead: Lead) {
    setEditingLead(lead);
    setForm(leadToForm(lead));
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setEditingLead(null);
    setForm(emptyLeadForm());
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const payload = formToPayload(form);

    if (editingLead) {
      updateMutation.mutate({ id: editingLead._id, payload });
    } else {
      createMutation.mutate(payload);
    }
  }

  function handleDelete(lead: Lead) {
    if (!window.confirm(`Delete lead "${lead.name}"?`)) return;
    deleteMutation.mutate(lead._id);
  }

  const saving = createMutation.isPending || updateMutation.isPending;
  const leads = data?.leads ?? [];
  const pagination = data?.pagination ?? {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
  };

  return (
    <section className="animate-in space-y-5 text-left">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2>Leads</h2>
          <p className="mt-0.5 text-sm text-[var(--text)]">
            Manage and track your sales pipeline
          </p>
        </div>
        <button type="button" onClick={openCreateModal} className="ui-btn-primary">
          + Add lead
        </button>
      </div>

      <div className="ui-card p-4 sm:p-5">
        <p className="mb-3 text-xs font-medium uppercase tracking-wide text-[var(--text)]">
          Filters
        </p>
        <LeadsFilters
          search={searchInput}
          status={filters.status}
          source={sourceInput}
          sortBy={filters.sortBy}
          order={filters.order}
          onSearchChange={(v) => {
            setSearchInput(v);
            updateFilters({ page: 1 });
          }}
          onStatusChange={(v) => updateFilters({ status: v, page: 1 })}
          onSourceChange={(v) => {
            setSourceInput(v);
            updateFilters({ page: 1 });
          }}
          onSortByChange={(v) => updateFilters({ sortBy: v, page: 1 })}
          onOrderChange={(v) => updateFilters({ order: v, page: 1 })}
        />
      </div>

      {isError && (
        <p className="ui-alert-error">{getErrorMessage(error, "Failed to load leads")}</p>
      )}

      <div className="ui-card overflow-hidden">
        <LeadsTable
          leads={leads}
          loading={isLoading}
          onEdit={openEditModal}
          onDelete={handleDelete}
          onAddLead={openCreateModal}
        />
        {!isLoading && leads.length > 0 && (
          <Pagination
            page={pagination.page}
            totalPages={pagination.totalPages}
            total={pagination.total}
            onPageChange={(page) => updateFilters({ page })}
          />
        )}
      </div>

      <LeadFormModal
        open={modalOpen}
        title={editingLead ? "Edit lead" : "New lead"}
        form={form}
        saving={saving}
        onClose={closeModal}
        onChange={setForm}
        onSubmit={handleSubmit}
      />
    </section>
  );
}
