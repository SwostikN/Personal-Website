// The single read path for content. Pages import from here, never from
// `src/content` directly, so the source can move to Sanity without page changes.
import { posts } from "@/content/posts";
import { bio, education, experience, languages, leadership, media, now, portrait, publications, skills, talks } from "@/content/profile";
import { projects } from "@/content/projects";
import { site } from "@/content/site";

export { bio, education, experience, languages, leadership, media, now, portrait, publications, site, skills, talks };

export function getProjects() {
  return projects;
}

export function getFeaturedProjects() {
  return projects.filter((p) => p.featured);
}

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function getAdjacentProject(slug: string) {
  const i = projects.findIndex((p) => p.slug === slug);
  return projects[(i + 1) % projects.length];
}

export function getPosts() {
  return [...posts].sort((a, b) => b.date.localeCompare(a.date));
}

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}
