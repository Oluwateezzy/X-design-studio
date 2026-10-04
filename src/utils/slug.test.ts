import { toSlug, isValidSlug, ensureUniqueSlug } from './slug.js';

function assertEqual<T>(actual: T, expected: T, message: string) {
  if (actual !== expected) {
    throw new Error(`Assertion Failed (${message}): expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
  }
}

console.log('Testing Slug Utility (Task 2.5)...');

// Validation Criterion 1: toSlug("My Landing Page!") → "my-landing-page"
const slug1 = toSlug('My Landing Page!');
assertEqual(slug1, 'my-landing-page', 'toSlug("My Landing Page!") converts to "my-landing-page"');
console.log('✔ toSlug("My Landing Page!") → "my-landing-page"');

// Validation Criterion 2: toSlug("   --hello--world--   ") → "hello-world"
const slug2 = toSlug('   --hello--world--   ');
assertEqual(slug2, 'hello-world', 'toSlug("   --hello--world--   ") trims and collapses hyphens');
console.log('✔ toSlug("   --hello--world--   ") → "hello-world"');

// Additional toSlug tests
assertEqual(toSlug('Component & Widget #1'), 'component-widget-1', 'Special chars stripped');
assertEqual(toSlug('a'.repeat(60)), 'a'.repeat(50), 'Truncated to max 50 chars');
assertEqual(toSlug('a'.repeat(49) + ' - b'), 'a'.repeat(49), 'Truncation removes trailing hyphens');
assertEqual(toSlug(''), '', 'Empty string returns empty string');

// Validation Criterion 3: ensureUniqueSlug("page", ["page", "page-2"]) → "page-3"
const uniqueSlug1 = ensureUniqueSlug('page', ['page', 'page-2']);
assertEqual(uniqueSlug1, 'page-3', 'ensureUniqueSlug("page", ["page", "page-2"]) returns "page-3"');
console.log('✔ ensureUniqueSlug("page", ["page", "page-2"]) → "page-3"');

// Additional ensureUniqueSlug tests
assertEqual(ensureUniqueSlug('new-page', ['page']), 'new-page', 'Unused slug returned as-is');
assertEqual(ensureUniqueSlug('Page', ['page']), 'page-2', 'Case insensitive check for existing slugs');

// Validation Criterion 4: isValidSlug("valid-slug-123") → true
assertEqual(isValidSlug('valid-slug-123'), true, 'isValidSlug("valid-slug-123") is true');
console.log('✔ isValidSlug("valid-slug-123") → true');

// Validation Criterion 5: isValidSlug("Invalid Slug!") → false
assertEqual(isValidSlug('Invalid Slug!'), false, 'isValidSlug("Invalid Slug!") is false');
console.log('✔ isValidSlug("Invalid Slug!") → false');

// Additional isValidSlug tests
assertEqual(isValidSlug('-invalid-slug'), false, 'Leading hyphen is invalid');
assertEqual(isValidSlug('invalid-slug-'), false, 'Trailing hyphen is invalid');
assertEqual(isValidSlug('invalid--slug'), false, 'Consecutive hyphens are invalid');
assertEqual(isValidSlug('a'.repeat(51)), false, 'Slug > 50 chars is invalid');

console.log('\nAll Task 2.5 Slug Utility unit tests passed successfully!');
