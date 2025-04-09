"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProjectList } from "@/components/project-list"
import { ProjectForm } from "@/components/project-form"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import type { Project } from "@/lib/types"

export function ProjectDashboard() {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [projects, setProjects] = useState<Project[]>([
    {
      id: "1",
      title: "[Outreachy 2025] [Pre-Requisite] [Step 1] Set up your Fedora Account System (FAS) account",
      creator: "Jona Azizaj",
      createdAt: "2 weeks ago",
      labels: ["Outreachy", "pre-requisites", "good first issue"],
      assignees: ["Kazenzi", "Bra Koose", "vintage-creator"],
      assigneeCount: 42,
      commentCount: 49,
      updateCount: 5,
      updatedAt: "1 day ago",
      type: "prerequisite",
      description: "Set up your Fedora Account System (FAS) account to get started with contributing to Fedora.",
      links: [],
      screenshots: [],
    },
    {
      id: "2",
      title: "[Outreachy 2025] [Pre-Requisite] [Step 2] Set up a personal blog",
      creator: "Jona Azizaj",
      createdAt: "2 weeks ago",
      labels: ["Outreachy", "pre-requisites", "good first issue"],
      assignees: ["Kazenzi", "Bra Koose", "vintage-creator"],
      assigneeCount: 42,
      commentCount: 49,
      updateCount: 5,
      updatedAt: "1 day ago",
      type: "prerequisite",
      description: "Create a personal blog where you can share your Outreachy journey.",
      links: [],
      screenshots: [],
    },
    {
      id: "3",
      title:
        "[Outreachy 2025] [Pre-Requisite] [Step 3] Write a blog post that introduces the Fedora community to your audience",
      creator: "Jona Azizaj",
      createdAt: "2 weeks ago",
      labels: ["Outreachy", "pre-requisites", "good first issue"],
      assignees: ["Kazenzi", "Bra Koose", "vintage-creator"],
      assigneeCount: 43,
      commentCount: 47,
      updateCount: 12,
      updatedAt: "1 day ago",
      type: "prerequisite",
      description: "Write a blog post introducing the Fedora community to your audience.",
      links: [],
      screenshots: [],
    },
    {
      id: "4",
      title: "[Outreachy 2025] [Pre-Requisite] [Step 4] Promote your intro blog post on social media",
      creator: "Jona Azizaj",
      createdAt: "2 weeks ago",
      labels: ["Outreachy", "pre-requisites", "good first issue"],
      assignees: ["Kazenzi", "Bra Koose", "vintage-creator"],
      assigneeCount: 43,
      commentCount: 46,
      updateCount: 7,
      updatedAt: "2 days ago",
      type: "prerequisite",
      description: "Share your blog post on social media to reach a wider audience.",
      links: [],
      screenshots: [],
    },
    {
      id: "5",
      title: "[Outreachy 2025] [Pre-Requisite] [Step 5] Write an onboarding guide for Outreachy applicants",
      creator: "Jona Azizaj",
      createdAt: "2 weeks ago",
      labels: ["Outreachy", "pre-requisites", "good first issue"],
      assignees: ["Kazenzi", "Bra Koose", "vintage-creator"],
      assigneeCount: 41,
      commentCount: 46,
      updateCount: 7,
      updatedAt: "1 day ago",
      type: "prerequisite",
      description: "Create a comprehensive onboarding guide to help future Outreachy applicants.",
      links: [],
      screenshots: [],
    },
    {
      id: "6",
      title: "[Outreachy 2025] [Stretch] Supporting local communities",
      creator: "Jona Azizaj",
      createdAt: "2 weeks ago",
      labels: ["Outreachy", "stretch-goal"],
      assignees: ["Kazenzi"],
      assigneeCount: 5,
      commentCount: 12,
      updateCount: 3,
      updatedAt: "3 days ago",
      type: "stretch",
      description: "Explore ways to support local communities through Fedora initiatives.",
      links: [],
      screenshots: [],
    },
  ])
  const [editingProject, setEditingProject] = useState<Project | null>(null)

  const handleAddProject = (project: Project) => {
    if (editingProject) {
      setProjects(projects.map((p) => (p.id === project.id ? project : p)))
      setEditingProject(null)
    } else {
      setProjects([...projects, { ...project, id: String(Date.now()) }])
    }
    setIsFormOpen(false)
  }

  const handleEditProject = (project: Project) => {
    setEditingProject(project)
    setIsFormOpen(true)
  }

  const handleDeleteProject = (id: string) => {
    setProjects(projects.filter((project) => project.id !== id))
  }

  const prerequisiteProjects = projects.filter((project) => project.type === "prerequisite")
  const otherProjects = projects.filter((project) => project.type !== "prerequisite")

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-slate-800">Fedora Projects Dashboard</h1>
        <Button
          onClick={() => {
            setEditingProject(null)
            setIsFormOpen(true)
          }}
          className="bg-red-600 hover:bg-red-700"
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Project
        </Button>
      </div>

      {isFormOpen && (
        <ProjectForm
          onSubmit={handleAddProject}
          onCancel={() => {
            setIsFormOpen(false)
            setEditingProject(null)
          }}
          initialData={editingProject}
        />
      )}

      <Tabs defaultValue="prerequisites" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="prerequisites">Prerequisites</TabsTrigger>
          <TabsTrigger value="other">Other Projects</TabsTrigger>
        </TabsList>
        <TabsContent value="prerequisites">
          <ProjectList projects={prerequisiteProjects} onEdit={handleEditProject} onDelete={handleDeleteProject} />
        </TabsContent>
        <TabsContent value="other">
          <ProjectList projects={otherProjects} onEdit={handleEditProject} onDelete={handleDeleteProject} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
