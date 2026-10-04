export type ProjectCreationType = 'scratch' | 'codebase' | 'url' | 'designMd';

export interface ProjectCreationSource {
  type: ProjectCreationType;
  source?: string; // file path, URL, or md content hash
}

export interface ProjectManifest {
  name: string;
  slug: string; // folder-safe name
  description: string;
  createdAt: string; // ISO 8601
  updatedAt: string;
  version: string; // semver
  creationSource: ProjectCreationSource;
  globalThemeId: string; // references global/theme.json
  pages: string[]; // ordered list of page slugs
  components: string[]; // ordered list of component slugs
}
