/**
 * Converts a user-provided string into a URL and file-system safe slug.
 *
 * Rules:
 * - Lowercase
 * - Replace spaces & underscores with hyphens
 * - Remove special characters (keeps a-z, 0-9, and -)
 * - Collapse multiple hyphens
 * - Trim leading/trailing hyphens
 * - Max 50 characters (stripping any trailing hyphen created by length truncation)
 */
export function toSlug(name: string): string {
  if (!name || typeof name !== 'string') {
    return '';
  }

  let slug = name
    .toLowerCase()
    .trim()
    .replace(/[\s_]+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');

  if (slug.length > 50) {
    slug = slug.substring(0, 50).replace(/-+$/g, '');
  }

  return slug;
}

/**
 * Checks if a string is a valid slug.
 *
 * Criteria:
 * - Non-empty, max 50 chars
 * - Contains only lowercase letters, numbers, and single hyphens
 * - No leading, trailing, or consecutive hyphens
 */
export function isValidSlug(slug: string): boolean {
  if (!slug || typeof slug !== 'string' || slug.length > 50) {
    return false;
  }
  return /^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug);
}

/**
 * Ensures a slug is unique against an array of existing slugs.
 * If the slug already exists in `existing`, appends `-2`, `-3`, etc.
 */
export function ensureUniqueSlug(slug: string, existing: string[]): string {
  const baseSlug = toSlug(slug) || 'untitled';
  const existingSet = new Set(existing.map((s) => s.toLowerCase()));

  if (!existingSet.has(baseSlug.toLowerCase())) {
    return baseSlug;
  }

  let counter = 2;
  while (existingSet.has(`${baseSlug}-${counter}`.toLowerCase())) {
    counter++;
  }

  return `${baseSlug}-${counter}`;
}
