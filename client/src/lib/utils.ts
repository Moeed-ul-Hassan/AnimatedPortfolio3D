import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const smoothScrollTo = (elementId: string) => {
  const element = document.getElementById(elementId);
  if (element) {
    window.scrollTo({
      top: element.offsetTop - 80,
      behavior: "smooth",
    });
  }
};

export async function fetchGitHubProjects(username: string) {
  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos`);
    
    if (!response.ok) {
      throw new Error(`GitHub API Error: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Filter for non-forked projects and sort by updated date
    const projects = data
      .filter((repo: any) => !repo.fork)
      .sort((a: any, b: any) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
      .slice(0, 6)
      .map((repo: any) => ({
        id: repo.id,
        name: repo.name,
        description: repo.description || "No description provided.",
        html_url: repo.html_url,
        homepage: repo.homepage,
        language: repo.language,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
      }));
    
    return projects;
  } catch (error) {
    console.error("Error fetching GitHub projects:", error);
    return [];
  }
}
