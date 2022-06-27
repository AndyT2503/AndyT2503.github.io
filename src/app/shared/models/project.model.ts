export interface ProjectData {
  name: string;
  image?: string;
  description: string;
  repoUrls: { tooltip: string; url: string }[];
  linkDemo?: { tooltip: string; url: string };
  tech: string[];
}
