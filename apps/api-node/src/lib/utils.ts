export function now() {
  return new Date().toISOString();
}

export function createId(prefix: string) {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}`;
}

export function paginate<T>(items: T[], page: number, limit: number) {
  const start = (page - 1) * limit;
  const end = start + limit;

  return {
    items: items.slice(start, end),
    meta: {
      page,
      limit,
      total: items.length,
      totalPages: Math.ceil(items.length / limit)
    }
  };
}

export function toNumber(value: unknown, fallback: number) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

export function matchesSearch(fields: Array<string | undefined>, search?: string) {
  if (!search) {
    return true;
  }

  const needle = search.toLowerCase();
  return fields.some((field) => field?.toLowerCase().includes(needle));
}
