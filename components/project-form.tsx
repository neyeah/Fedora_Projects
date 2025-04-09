"use client"

import { Badge } from "@/components/ui/badge"
import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { X, Plus } from "lucide-react"

interface ProjectLink {
  title: string
  url: string
}

type ProjectType = "prerequisite" | "stretch" | "other"

interface Project {
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
  type: ProjectType
  description: string
  links: ProjectLink[]
  screenshots: string[]
}

interface ProjectFormProps {
  onSubmit: (project: Project) => void
  onCancel: () => void
  initialData?: Project | null
}

export function ProjectForm({ onSubmit, onCancel, initialData }: ProjectFormProps) {
  const [formData, setFormData] = useState<Project>(
    initialData || {
      id: "",
      title: "",
      creator: "You",
      createdAt: "Just now",
      labels: [],
      assignees: [],
      assigneeCount: 0,
      commentCount: 0,
      updateCount: 0,
      updatedAt: "Just now",
      type: "prerequisite",
      description: "",
      links: [],
      screenshots: [],
    },
  )

  const [newLabel, setNewLabel] = useState("")
  const [newLink, setNewLink] = useState<ProjectLink>({ title: "", url: "" })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const addLabel = () => {
    if (newLabel.trim() && !formData.labels.includes(newLabel.trim())) {
      setFormData({
        ...formData,
        labels: [...formData.labels, newLabel.trim()],
      })
      setNewLabel("")
    }
  }

  const removeLabel = (label: string) => {
    setFormData({
      ...formData,
      labels: formData.labels.filter((l) => l !== label),
    })
  }

  const addLink = () => {
    if (newLink.title.trim() && newLink.url.trim()) {
      setFormData({
        ...formData,
        links: [...formData.links, { ...newLink }],
      })
      setNewLink({ title: "", url: "" })
    }
  }

  const removeLink = (index: number) => {
    setFormData({
      ...formData,
      links: formData.links.filter((_, i) => i !== index),
    })
  }

  const handleScreenshotUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      const reader = new FileReader()

      reader.onloadend = () => {
        setFormData({
          ...formData,
          screenshots: [...formData.screenshots, reader.result as string],
        })
      }

      reader.readAsDataURL(file)
    }
  }

  const removeScreenshot = (index: number) => {
    setFormData({
      ...formData,
      screenshots: formData.screenshots.filter((_, i) => i !== index),
    })
  }

  const handleTypeChange = (value: string) => {
    // Ensure the value is one of the allowed types
    const validType: ProjectType =
      value === "prerequisite" || value === "stretch" || value === "other" ? value : "other"

    setFormData({
      ...formData,
      type: validType,
    })
  }

  return (
    <Card className="mb-8 bg-white">
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle>{initialData ? "Edit Project" : "Add New Project"}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Project Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Enter project title"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Enter project description"
              rows={3}
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Project Type</Label>
            <RadioGroup value={formData.type} onValueChange={handleTypeChange} className="flex space-x-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="prerequisite" id="prerequisite" />
                <Label htmlFor="prerequisite">Prerequisite</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="stretch" id="stretch" />
                <Label htmlFor="stretch">Stretch Goal</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="other" id="other" />
                <Label htmlFor="other">Other</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label>Labels</Label>
            <div className="flex space-x-2">
              <Input value={newLabel} onChange={(e) => setNewLabel(e.target.value)} placeholder="Add a label" />
              <Button type="button" onClick={addLabel} variant="outline">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.labels.map((label, index) => (
                <Badge key={index} variant="outline" className="bg-slate-100 flex items-center">
                  {label}
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 ml-1 p-0"
                    onClick={() => removeLabel(label)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Links</Label>
            <div className="flex space-x-2">
              <Input
                value={newLink.title}
                onChange={(e) => setNewLink({ ...newLink, title: e.target.value })}
                placeholder="Link title"
                className="flex-1"
              />
              <Input
                value={newLink.url}
                onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
                placeholder="URL"
                className="flex-1"
              />
              <Button type="button" onClick={addLink} variant="outline">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-2 mt-2">
              {formData.links.map((link, index) => (
                <div key={index} className="flex items-center justify-between bg-slate-50 p-2 rounded">
                  <div>
                    <span className="font-medium">{link.title}</span>
                    <span className="text-xs text-slate-500 ml-2">{link.url}</span>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => removeLink(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Screenshots</Label>
            <Input type="file" accept="image/*" onChange={handleScreenshotUpload} className="cursor-pointer" />
            <div className="grid grid-cols-2 gap-2 mt-2">
              {formData.screenshots.map((screenshot, index) => (
                <div key={index} className="relative">
                  <img
                    src={screenshot || "/placeholder.svg"}
                    alt={`Screenshot ${index + 1}`}
                    className="rounded-md border border-slate-200 w-full h-32 object-cover"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute top-1 right-1 h-6 w-6"
                    onClick={() => removeScreenshot(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
            {initialData ? "Update Project" : "Add Project"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
