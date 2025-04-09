export interface ProjectLink {
  title: string
  url: string
}

export interface Project {
  id: string
  title: string
  creator: string
  createdAt: string
  labels: string[]
  assignees: string[]
  assigneeCount: number
  commentCount: number
  updateCount: number
  updatedAt: string
  type: "prerequisite" | "stretch" | "other"
  description: string
  links: ProjectLink[]
  screenshots: string[]
}
