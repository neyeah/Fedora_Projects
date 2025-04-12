"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, ExternalLink } from "lucide-react"
import { FedoraLogo } from "./fedora-logo"

interface Project {
  id: string
  title: string
  completed: boolean
  tags: string[]
  description: string
  link?: string
}

// These are the projects that would be imported from your code
const PROJECTS = [
  {
    id: "1",
    title: "Setting up my Fedora Account System (FAS) account",
    completed: true,
    tags: ["Documentation"],
    description:
      "Created my Fedora Account System account to access Fedora resources and contribute to the community. This is the first step in becoming a Fedora contributor and allows me to participate in various Fedora projects and initiatives.",
      link: "https://gitlab.com/fedora/dei/outreachy-internship/-/issues/1#note_2403009991",
  },
  {
    id: "2",
    title: "Setting up my personal blog",
    completed: true,
    tags: ["Documentation"],
    description:
      "Created a personal blog where I'll document my Outreachy journey and share my experiences. Having a blog allows me to reflect on my learning process and share knowledge with others who might be interested in similar paths.",
       link: "https://medium.com/@neyehh",
  },
  {
    id: "3",
    title: "Writing a blog post introducing the Fedora community",
    completed: true,
    tags: ["Community"],
    description:
      "Published my first blog post about the Fedora community, its values, and how others can get involved. This post helps newcomers understand what Fedora is all about and how they can become part of this vibrant open-source community.",
      link: "https://medium.com/@neyehh/0263514cc2cb",
  },
  {
    id: "4",
    title: "Promoting my intro blog post on social media",
    completed: true,
    tags: ["Community", "Outreach"],
    description:
      "Shared my Fedora community blog post across various social media platforms to reach a wider audience. This helps spread awareness about Fedora and potentially attracts new contributors to the project.",
    link: "https://x.com/neyehh/status/1902670183572840884",
  },
  {
    id: "5",
    title: "Writing an onboarding guide for outreachy applicants",
    completed: true,
    tags: ["Documentation", "Community"],
    description:
      "Created a comprehensive guide to help future applicants who are applying for the Outreachy program. It included details about what helped me ace the first and all they need to know about the program. It also included tips on how to prepare for the application process, what to expect during the contribution stage, and how to make the most of the experience.",
    link: "https://medium.com/@neyehh/your-ultimate-guide-to-applying-for-the-outreachy-internship-program-1fe884df0f7c",
  },
  {
    id: "6",
    title: "Supporting local communities",
    completed: true,
    tags: ["Community", "Outreach"],
    description:
      "Shared my personal journey with the open-source project 'Mental NG' on my blog, highlighting how it raises mental health awareness in Nigeria. This initiative aims to provide accessible mental health resources through an AI-powered app. By sharing my experience, I hope to inspire others and attract support for our mission. Fedora can significantly enhance our efforts by offering mentorship, technical expertise, and community outreach support, helping us reach a broader audience and make a greater impact. ",
    link: "https://medium.com/@neyehh/building-a-future-for-mental-health-awareness-in-nigeria-d9d092a2dd75",
  },
  {
    id: "7",
    title: " Planned a Fedora event at my community",
    completed: true,
    tags: ["Community", "Event Planning"],
    description:
      "Organized and planned a Fedora-related event in Abuja, Nigeria, featuring workshops, talks, and community meetups. The event aimed to introduce Fedora and encourage contributions to the community. The detailed plan included Promotional strategies, goals, a timeline, and necessary resources. This initiative could help raise awareness about Fedora and fostered a local community of open-source enthusiasts.",
    link: "https://docs.google.com/document/d/1gvsPtcxC1AQMhGj9q6VEKdRnanQywhF-SRb5EuDF4j0/edit?usp=sharing",
  },
  {
    id: "8",
    title: "A high level timeline for my Outreachy internship",
    completed: true,
    tags: ["Event Planning"],
    description:
      "Created an overview of my proposed plan for the three-month internship Focusing on Enhancing DEI Event Organization Documentation and Coordinating with Local Communities",
    link: "https://docs.google.com/document/d/1YL8v0kL3q4wOx0dChBc4l1ft1vi5dQ3oJcI7OzdJWRM/edit?usp=sharing",
  },
]

export function ProjectDisplay() {
  return (
    <div className="container mx-auto py-8 px-4">
      <header className="mb-8 text-center">
        <div className="flex justify-center mb-4">
          <FedoraLogo />
        </div>
        <h1 className="text-3xl font-bold text-slate-800 mb-2">My Fedora Projects</h1>
        <p className="text-slate-600">My journey with Fedora</p>
      </header>

      <div className="grid gap-6 max-w-3xl mx-auto">
        {PROJECTS.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  )
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className="overflow-hidden border-l-4 border-l-blue-600">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-slate-800 flex items-start gap-2">
          <CheckCircle2 className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
          {project.link ? (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline flex items-center gap-1"
            >
              {project.title}
              <ExternalLink className="h-4 w-4 inline-block" />
            </a>
          ) : (
            project.title
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-slate-50 p-4 rounded-md border border-slate-100">
          <p className="text-slate-700">{project.description}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag: string, index: number) => (
            <Badge key={index} variant="outline" className="bg-slate-100">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
