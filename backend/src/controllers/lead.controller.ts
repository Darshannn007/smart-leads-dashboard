import { Response } from "express";
import mongoose from "mongoose";
import { AuthRequest } from "../types/auth";
import { Lead, LEAD_STATUSES, LeadStatus } from "../models/Lead";

function getLeadId(req: AuthRequest): string | null {
  const id = req.params.id;
  if (typeof id !== "string" || !mongoose.Types.ObjectId.isValid(id)) {
    return null;
  }
  return id;
}

const SORT_FIELDS = [
  "createdAt",
  "name",
  "email",
  "status",
  "value",
  "company",
] as const;

type SortField = (typeof SORT_FIELDS)[number];

function parsePagination(query: AuthRequest["query"]) {
  const page = Math.max(1, parseInt(String(query.page ?? "1"), 10) || 1);
  const limit = Math.min(
    100,
    Math.max(1, parseInt(String(query.limit ?? "10"), 10) || 10)
  );
  const skip = (page - 1) * limit;
  return { page, limit, skip };
}

function parseSort(query: AuthRequest["query"]) {
  const sortBy = String(query.sortBy ?? "createdAt");
  const field: SortField = SORT_FIELDS.includes(sortBy as SortField)
    ? (sortBy as SortField)
    : "createdAt";
  const order = String(query.order ?? "desc").toLowerCase() === "asc" ? 1 : -1;
  return { [field]: order } as Record<string, 1 | -1>;
}

export async function getLeads(req: AuthRequest, res: Response): Promise<void> {
  try {
    if (!req.userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const { page, limit, skip } = parsePagination(req.query);
    const filter: Record<string, unknown> = { userId: req.userId };

    const status = req.query.status;
    if (status && LEAD_STATUSES.includes(status as LeadStatus)) {
      filter.status = status;
    }

    const source = req.query.source;
    if (source && typeof source === "string") {
      filter.source = { $regex: source, $options: "i" };
    }

    const minValue = req.query.minValue;
    const maxValue = req.query.maxValue;
    if (minValue !== undefined || maxValue !== undefined) {
      filter.value = {};
      if (minValue !== undefined) {
        (filter.value as Record<string, number>).$gte = Number(minValue);
      }
      if (maxValue !== undefined) {
        (filter.value as Record<string, number>).$lte = Number(maxValue);
      }
    }

    const search = req.query.search;
    if (search && typeof search === "string" && search.trim()) {
      const term = search.trim();
      filter.$or = [
        { name: { $regex: term, $options: "i" } },
        { email: { $regex: term, $options: "i" } },
        { company: { $regex: term, $options: "i" } },
        { phone: { $regex: term, $options: "i" } },
        { source: { $regex: term, $options: "i" } },
      ];
    }

    const sort = parseSort(req.query);

    const [leads, total] = await Promise.all([
      Lead.find(filter).sort(sort).skip(skip).limit(limit),
      Lead.countDocuments(filter),
    ]);

    res.json({
      leads,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit) || 1,
      },
    });
  } catch {
    res.status(500).json({ message: "Could not fetch leads" });
  }
}

export async function getLeadById(
  req: AuthRequest,
  res: Response
): Promise<void> {
  try {
    const leadId = getLeadId(req);
    if (!leadId || !req.userId) {
      res.status(400).json({ message: "Invalid lead id" });
      return;
    }

    const lead = await Lead.findOne({ _id: leadId, userId: req.userId });
    if (!lead) {
      res.status(404).json({ message: "Lead not found" });
      return;
    }
    res.json({ lead });
  } catch {
    res.status(500).json({ message: "Could not fetch lead" });
  }
}

export async function createLead(
  req: AuthRequest,
  res: Response
): Promise<void> {
  try {
    if (!req.userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const { name, email, phone, company, status, source, value, notes } =
      req.body;

    if (!name || !email) {
      res.status(400).json({ message: "Name and email are required" });
      return;
    }

    if (status && !LEAD_STATUSES.includes(status)) {
      res.status(400).json({ message: "Invalid status" });
      return;
    }

    const lead = await Lead.create({
      userId: req.userId,
      name,
      email,
      phone,
      company,
      status: status ?? "new",
      source,
      value,
      notes,
    });

    res.status(201).json({ message: "Lead created", lead });
  } catch {
    res.status(500).json({ message: "Could not create lead" });
  }
}

export async function updateLead(
  req: AuthRequest,
  res: Response
): Promise<void> {
  try {
    const leadId = getLeadId(req);
    if (!leadId || !req.userId) {
      res.status(400).json({ message: "Invalid lead id" });
      return;
    }

    const { name, email, phone, company, status, source, value, notes } =
      req.body;

    if (status && !LEAD_STATUSES.includes(status)) {
      res.status(400).json({ message: "Invalid status" });
      return;
    }

    const updates: Record<string, unknown> = {};
    if (name !== undefined) updates.name = name;
    if (email !== undefined) updates.email = email;
    if (phone !== undefined) updates.phone = phone;
    if (company !== undefined) updates.company = company;
    if (status !== undefined) updates.status = status;
    if (source !== undefined) updates.source = source;
    if (value !== undefined) updates.value = value;
    if (notes !== undefined) updates.notes = notes;

    const lead = await Lead.findOneAndUpdate(
      { _id: leadId, userId: req.userId },
      updates,
      { new: true, runValidators: true }
    );

    if (!lead) {
      res.status(404).json({ message: "Lead not found" });
      return;
    }

    res.json({ message: "Lead updated", lead });
  } catch {
    res.status(500).json({ message: "Could not update lead" });
  }
}

export async function deleteLead(
  req: AuthRequest,
  res: Response
): Promise<void> {
  try {
    const leadId = getLeadId(req);
    if (!leadId || !req.userId) {
      res.status(400).json({ message: "Invalid lead id" });
      return;
    }

    const lead = await Lead.findOneAndDelete({
      _id: leadId,
      userId: req.userId,
    });

    if (!lead) {
      res.status(404).json({ message: "Lead not found" });
      return;
    }

    res.json({ message: "Lead deleted" });
  } catch {
    res.status(500).json({ message: "Could not delete lead" });
  }
}
