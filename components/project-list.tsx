"use client"

import type { Project } from "@/lib/types"
import { ProjectCard } from "@/components/project-card"

interface ProjectListProps {
  projects: Project[]
  onEdit: (project: Project) => void
  onDelete: (id: string) => void
}

export function ProjectList({ projects, onEdit, onDelete }: ProjectListProps) {
  if (projects.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg shadow">
        <h3 className="text-lg font-medium text-slate-600">No projects found</h3>
        <p className="text-slate-500 mt-2">Add a new project to get started.</p>
      </div>
    )
  }

  return (
    <div className="grid gap-6">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          onEdit={() => onEdit(project)}
          onDelete={() => onDelete(project.id)}
        />
      ))}
    </div>
  )
}
