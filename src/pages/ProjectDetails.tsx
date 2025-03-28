import { useState } from 'react';




import {   Upload,Input} from "antd";
import { ArrowLeft, Download, FileText, GitBranch, LinkIcon, MessageSquare, MoreVertical, Star,Calendar, } from "lucide-react";
import { Link,useParams  } from "react-router-dom";


import { Card } from "../components/ui/Card";
import { Avatar, AvatarFallback } from "../components/ui/Avatar";
import { Progress } from "../components/ui/Progress";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";



const ProjectDetails = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('overview');
  const [newComment, setNewComment] = useState('');
  
  // Mock project data
  const project = {
    id: 1,
    title: "E-commerce Platform",
    description: "Build a full-stack e-commerce platform with product catalog, cart, and payment integration. The system should include user authentication, product management, shopping cart functionality, and secure checkout process.",
    team: [
      { name: "John Doe", role: "Frontend Lead", avatar: "JD" },
      { name: "Maria Smith", role: "Backend Developer", avatar: "MS" },
      { name: "Alex Kim", role: "UI/UX Designer", avatar: "AK" }
    ],
    supervisor: { 
      name: "Dr. Smith", 
      avatar: "DS",
      rating: 4.8,
      feedback: "The team is making good progress. Keep up the good work!"
    },
    status: "In Progress",
    progress: 65,
    startDate: "2024-01-15",
    deadline: "2024-03-15",
    repository: "https://github.com/team/ecommerce-project",
    techStack: ["React", "Node.js", "MongoDB", "Express"],
    milestones: [
      { 
        title: "Project Setup & Planning", 
        dueDate: "2024-01-30", 
        status: "Completed",
        deliverables: ["Project proposal", "Architecture diagram", "Tech stack documentation"]
      },
      { 
        title: "Frontend Implementation", 
        dueDate: "2024-02-15", 
        status: "Completed",
        deliverables: ["User interface", "Component library", "State management"]
      },
      { 
        title: "Backend API Development", 
        dueDate: "2024-02-28", 
        status: "In Progress",
        deliverables: ["API endpoints", "Database schema", "Authentication system"]
      },
      { 
        title: "Integration & Testing", 
        dueDate: "2024-03-10", 
        status: "Pending",
        deliverables: ["API integration", "Unit tests", "E2E tests"]
      }
    ],
    discussions: [
      { 
        author: "Dr. Smith",
        avatar: "DS",
        content: "Please make sure to implement proper error handling in the API endpoints.",
        date: "2024-02-10",
        type: "feedback"
      },
      { 
        author: "John Doe",
        avatar: "JD",
        content: "We've completed the user authentication system. Moving on to product management now.",
        date: "2024-02-08",
        type: "update"
      },
      { 
        author: "Maria Smith",
        avatar: "MS",
        content: "I've pushed the latest API changes to the repository. Please review when you have time.",
        date: "2024-02-05",
        type: "update"
      }
    ],
    documents: [
      {
        name: "Project Proposal.pdf",
        type: "pdf",
        size: "2.4 MB",
        uploadedBy: "John Doe",
        date: "2024-01-15"
      },
      {
        name: "API Documentation.md",
        type: "markdown",
        size: "156 KB",
        uploadedBy: "Maria Smith",
        date: "2024-02-01"
      }
    ]
  };

  const handleSubmitComment = () => {
    if (newComment.trim()) {
      setNewComment('');
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Project Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
          <Link 
            to="/portal/projects"
            className="inline-flex items-center text-sm text-gray-500 hover:text-gray-900 mb-4 sm:mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Projects
          </Link>

          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 sm:gap-0">
            <div>
              <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">
                {project.title}
              </h1>
              <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                <Badge variant="info">{project.status}</Badge>
                <span className="text-sm text-gray-500 flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  Due {project.deadline}
                </span>
                <span className="text-sm text-gray-500 flex items-center">
                  <Star className="w-4 h-4 mr-1 fill-amber-400 stroke-amber-400" />
                  {project.supervisor.rating}
                </span>
              </div>
            </div>

            <div className="flex gap-3 mt-4 sm:mt-0">
              <button className="inline-flex items-center px-3 sm:px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                <GitBranch className="w-4 h-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Repository</span>
                <span className="inline sm:hidden">Repo</span>
              </button>
           
            </div>
          </div>


          <div className="mt-6 sm:mt-8 overflow-x-auto">
           
          </div>
        </div>
      </div>

 
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
        <Tabs defaultValue="overview">
          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
  
              <Card className="lg:col-span-2">
                <div className="p-4 sm:p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Project Progress
                  </h3>
                  <div className="mb-6">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">Overall Progress</span>
                      <span className="font-medium">{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} className="h-2" />
                  </div>
                  <p className="text-gray-600 mb-6">
                    {project.description}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 mb-2">
                        Tech Stack
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {project.techStack.map((tech) => (
                          <Badge key={tech} variant="secondary">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 mb-2">
                        Important Links
                      </h4>
                      <div className="space-y-2">
                        <a 
                          href={project.repository}
                          className="flex items-center text-sm text-indigo-600 hover:text-indigo-700"
                        >
                          <LinkIcon className="w-4 h-4 mr-2" />
                          GitHub Repository
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Team Card */}
              <Card>
                <div className="p-4 sm:p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Team Members
                  </h3>
                  <div className="space-y-4">
                    <div className="pb-4 border-b">
                      <div className="text-sm text-gray-500 mb-3">Supervisor</div>
                      <div className="flex items-center">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback>{project.supervisor.avatar}</AvatarFallback>
                        </Avatar>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">
                            {project.supervisor.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            Project Supervisor
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-sm text-gray-500 mb-3">Team Members</div>
                      <div className="space-y-3">
                        {project.team.map((member) => (
                          <div key={member.name} className="flex items-center">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>{member.avatar}</AvatarFallback>
                            </Avatar>
                            <div className="ml-3">
                              <div className="text-sm font-medium text-gray-900">
                                {member.name}
                              </div>
                              <div className="text-xs text-gray-500">
                                {member.role}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          
          <TabsContent value="milestones">
            <div className="space-y-4">
              {project.milestones.map((milestone, index) => (
                <Card key={index}>
                  <div className="p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 mb-4">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">
                          {milestone.title}
                        </h3>
                        <p className="text-sm text-gray-500">Due: {milestone.dueDate}</p>
                      </div>
                      <Badge 
                        variant={milestone.status === "Completed" ? "success" : 
                                milestone.status === "In Progress" ? "warning" : "secondary"}
                      >
                        {milestone.status}
                      </Badge>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Deliverables</h4>
                      <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                        {milestone.deliverables.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>


          <TabsContent value="discussions">
            <div className="space-y-4">
              <Card>
                <div className="p-4 sm:p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Add Comment</h3>
                  <div className="space-y-4">
                    <Input 
                      placeholder="Add a comment or update..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      className="min-h-24"
                    />
                    <div className="flex justify-end">
                      <button 
                        onClick={handleSubmitComment}
                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
                      >
                        Post Comment
                      </button>
                    </div>
                  </div>
                </div>
              </Card>

              <div className="space-y-4">
                {project.discussions.map((discussion, index) => (
                  <Card key={index}>
                    <div className="p-4 sm:p-6">
                      <div className="flex items-start">
                        <Avatar className="h-10 w-10 mt-1">
                          <AvatarFallback>{discussion.avatar}</AvatarFallback>
                        </Avatar>
                        <div className="ml-4 flex-1">
                          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mb-2">
                            <span className="font-medium text-gray-900">{discussion.author}</span>
                            <span className="text-sm text-gray-500">{discussion.date}</span>
                            <Badge variant="outline" className="w-fit">
                              {discussion.type === "feedback" ? "Feedback" : "Update"}
                            </Badge>
                          </div>
                          <p className="text-gray-700">{discussion.content}</p>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Documents Tab */}
          <TabsContent value="documents">
            <Card>
              <div className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 sm:gap-0 mb-6">
                  <h3 className="text-lg font-medium text-gray-900">Project Documents</h3>
                  <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 w-full sm:w-auto justify-center">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Document
                  </button>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Type</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Size</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Uploaded By</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {project.documents.map((doc, index) => (
                        <tr key={index}>
                          <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            <div className="flex items-center">
                              <FileText className="w-4 h-4 mr-2 text-gray-400" />
                              {doc.name}
                            </div>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 hidden sm:table-cell">{doc.type}</td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 hidden sm:table-cell">{doc.size}</td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell">{doc.uploadedBy}</td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{doc.date}</td>
                          <td className="px-4 py-4 whitespace-nowrap text-right text-sm">
                            <button className="text-indigo-600 hover:text-indigo-900 mr-3">
                              <Download className="w-4 h-4" />
                            </button>
                            <button className="text-gray-500 hover:text-gray-700">
                              <MoreVertical className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProjectDetails