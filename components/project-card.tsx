"use client"

import type { Project } from "@/lib/types"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MessageSquare, RefreshCw, Clock, User, Users, Edit, Trash2, LinkIcon, Image } from "lucide-react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { useState } from "react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface ProjectCardProps {
  project: Project
  onEdit: () => void
  onDelete: () => void
}

export function ProjectCard({ project, onEdit, onDelete }: ProjectCardProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Card className="overflow-hidden bg-white">
      <CardHeader className="bg-slate-50 pb-2">
        <div className="flex justify-between">
          <h3 className="text-lg font-semibold text-slate-800">{project.title}</h3>
          <div className="flex space-x-2">
            <Button variant="ghost" size="icon" onClick={onEdit}>
              <Edit className="h-4 w-4" />
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete the project.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={onDelete} className="bg-red-600 hover:bg-red-700">
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {project.labels.map((label, index) => (
            <Badge key={index} variant="outline" className="bg-slate-100">
              {label}
            </Badge>
          ))}
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="text-sm text-slate-600 mb-4">
          <p>{project.description}</p>
        </div>
        <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
          <CollapsibleTrigger asChild>
            <Button variant="outline" size="sm" className="w-full">
              {isOpen ? "Show Less" : "Show Details"}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-4 space-y-4">
            {project.links.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium flex items-center">
                  <LinkIcon className="h-4 w-4 mr-2" />
                  Links
                </h4>
                <ul className="list-disc list-inside text-sm text-blue-600">
                  {project.links.map((link, index) => (
                    <li key={index}>
                      <a href={link.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                        {link.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {project.screenshots.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium flex items-center">
                  <Image className="h-4 w-4 mr-2" />
                  Screenshots
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {project.screenshots.map((screenshot, index) => (
                    <img
                      key={index}
                      src={screenshot || "/placeholder.svg"}
                      alt={`Screenshot ${index + 1}`}
                      className="rounded-md border border-slate-200"
                    />
                  ))}
                </div>
              </div>
            )}
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
      <CardFooter className="bg-slate-50 text-xs text-slate-500 flex flex-wrap justify-between gap-y-2">
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <User className="h-3 w-3 mr-1" />
            <span>{project.creator}</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            <span>{project.createdAt}</span>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <Users className="h-3 w-3 mr-1" />
            <span>+{project.assigneeCount}</span>
          </div>
          <div className="flex items-center">
            <MessageSquare className="h-3 w-3 mr-1" />
            <span>{project.commentCount}</span>
          </div>
          <div className="flex items-center">
            <RefreshCw className="h-3 w-3 mr-1" />
            <span>{project.updateCount}</span>
          </div>
          <div>Updated {project.updatedAt}</div>
        </div>
      </CardFooter>
    </Card>
  )
}
