"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar, CheckCircle2, Clock, XCircle } from "lucide-react"
import { format, isPast } from "date-fns"
import { Button } from "@/components/ui/button"

// Assignment data
const assignmentData = [
  {
    id: 1,
    title: "Complex Organization Speech",
    description: "Three (3) minute duration speech about a complex organization you're part of.",
    dueDate: "2025-02-10",
    category: "speech",
    completed: false,
  },
  {
    id: 2,
    title: "Speech to Inform Outline",
    description: "Written outline for your Speech to Inform, including bibliography with at least 4 sources.",
    dueDate: "2025-03-03",
    category: "outline",
    completed: false,
  },
  {
    id: 3,
    title: "Speech to Inform",
    description: "Five (5) to seven (7) minute speech requiring academic research with at least 4 sources.",
    dueDate: "2025-03-03",
    category: "speech",
    completed: false,
  },
  {
    id: 4,
    title: "Speech of Demonstration Outline",
    description: "Written outline for your Speech of Demonstration, including bibliography with at least 3 sources.",
    dueDate: "2025-03-24",
    category: "outline",
    completed: false,
  },
  {
    id: 5,
    title: "Speech of Demonstration",
    description: "Seven (7) minute speech showing the class 'how to' do something, with at least 3 sources.",
    dueDate: "2025-03-24",
    category: "speech",
    completed: false,
  },
  {
    id: 6,
    title: "Speech to Persuade Outline",
    description: "Written outline for your Speech to Persuade, including bibliography with at least 5 sources.",
    dueDate: "2025-04-28",
    category: "outline",
    completed: false,
  },
  {
    id: 7,
    title: "Speech to Persuade",
    description: "Six (6) to eight (8) minute persuasive speech with at least 5 sources. Visual aid required.",
    dueDate: "2025-04-28",
    category: "speech",
    completed: false,
  },
  {
    id: 8,
    title: "Final Paper",
    description: "Five (5) page paper that applies class concepts to real world examples. Cite lectures and text.",
    dueDate: "2025-05-07",
    category: "paper",
    completed: false,
  },
  {
    id: 9,
    title: "Discussion Board Posting 1",
    description: "First required discussion board posting.",
    dueDate: "2025-02-17",
    category: "discussion",
    completed: false,
  },
  {
    id: 10,
    title: "Discussion Board Posting 2",
    description: "Second required discussion board posting.",
    dueDate: "2025-03-17",
    category: "discussion",
    completed: false,
  },
  {
    id: 11,
    title: "Discussion Board Posting 3",
    description: "Third required discussion board posting.",
    dueDate: "2025-04-14",
    category: "discussion",
    completed: false,
  },
]

export default function TodoPage() {
  const [assignments, setAssignments] = useState(assignmentData)
  const [filter, setFilter] = useState("all")

  // Load saved state from localStorage
  useEffect(() => {
    const savedAssignments = localStorage.getItem("com1010-assignments")
    if (savedAssignments) {
      setAssignments(JSON.parse(savedAssignments))
    }
  }, [])

  // Save to localStorage when assignments change
  useEffect(() => {
    localStorage.setItem("com1010-assignments", JSON.stringify(assignments))
  }, [assignments])

  const toggleComplete = (id: number) => {
    setAssignments(
      assignments.map((assignment) =>
        assignment.id === id ? { ...assignment, completed: !assignment.completed } : assignment,
      ),
    )
  }

  const filteredAssignments = assignments.filter((assignment) => {
    if (filter === "all") return true
    if (filter === "completed") return assignment.completed
    if (filter === "pending") return !assignment.completed
    if (filter === "overdue") return !assignment.completed && isPast(new Date(assignment.dueDate))
    if (filter === "upcoming") return !assignment.completed && !isPast(new Date(assignment.dueDate))
    return assignment.category === filter
  })

  const getStatusColor = (dueDate: string, completed: boolean) => {
    if (completed) return "text-green-500 dark:text-green-400"
    return isPast(new Date(dueDate)) ? "text-red-500 dark:text-red-400" : "text-yellow-500 dark:text-yellow-400"
  }

  const getStatusIcon = (dueDate: string, completed: boolean) => {
    if (completed) return <CheckCircle2 className="h-5 w-5 text-green-500 dark:text-green-400" />
    return isPast(new Date(dueDate)) ? (
      <XCircle className="h-5 w-5 text-red-500 dark:text-red-400" />
    ) : (
      <Clock className="h-5 w-5 text-yellow-500 dark:text-yellow-400" />
    )
  }

  return (
    <div className="container py-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Assignment To-Do List</h1>
          <p className="text-muted-foreground">Track and manage your COM1010 assignments</p>
        </div>
      </div>

      <Tabs defaultValue="all" onValueChange={setFilter}>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="overdue">Overdue</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          </TabsList>

          <div className="hidden md:flex gap-2">
            <Button
              variant={filter === "speech" ? "default" : "outline"}
              size="sm"
              className="rounded-full"
              onClick={() => setFilter("speech")}
            >
              Speeches
            </Button>
            <Button
              variant={filter === "outline" ? "default" : "outline"}
              size="sm"
              className="rounded-full"
              onClick={() => setFilter("outline")}
            >
              Outlines
            </Button>
            <Button
              variant={filter === "paper" ? "default" : "outline"}
              size="sm"
              className="rounded-full"
              onClick={() => setFilter("paper")}
            >
              Papers
            </Button>
            <Button
              variant={filter === "discussion" ? "default" : "outline"}
              size="sm"
              className="rounded-full"
              onClick={() => setFilter("discussion")}
            >
              Discussions
            </Button>
          </div>
        </div>

        <TabsContent value="all" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>All Assignments</CardTitle>
              <CardDescription>View and manage all your COM1010 assignments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredAssignments.length === 0 ? (
                  <div className="text-center py-6">
                    <p className="text-muted-foreground">No assignments found</p>
                  </div>
                ) : (
                  filteredAssignments.map((assignment) => (
                    <div
                      key={assignment.id}
                      className={`flex items-start gap-4 p-4 border rounded-lg ${
                        assignment.completed ? "bg-muted/30" : ""
                      }`}
                    >
                      <Checkbox
                        id={`assignment-${assignment.id}`}
                        checked={assignment.completed}
                        onCheckedChange={() => toggleComplete(assignment.id)}
                      />
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <label
                            htmlFor={`assignment-${assignment.id}`}
                            className={`font-medium ${assignment.completed ? "line-through text-muted-foreground" : ""}`}
                          >
                            {assignment.title}
                          </label>
                          <div className="flex items-center gap-2">
                            <span className={`text-xs ${getStatusColor(assignment.dueDate, assignment.completed)}`}>
                              {assignment.completed
                                ? "Completed"
                                : isPast(new Date(assignment.dueDate))
                                  ? "Overdue"
                                  : "Pending"}
                            </span>
                            {getStatusIcon(assignment.dueDate, assignment.completed)}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">{assignment.description}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Calendar className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">
                            Due: {format(new Date(assignment.dueDate), "MMMM d, yyyy")}
                          </span>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-secondary">{assignment.category}</span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pending" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Pending Assignments</CardTitle>
              <CardDescription>Assignments that need to be completed</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredAssignments.length === 0 ? (
                  <div className="text-center py-6">
                    <p className="text-muted-foreground">No pending assignments</p>
                  </div>
                ) : (
                  filteredAssignments.map((assignment) => (
                    <div
                      key={assignment.id}
                      className={`flex items-start gap-4 p-4 border rounded-lg ${
                        isPast(new Date(assignment.dueDate)) ? "border-red-200 dark:border-red-800" : ""
                      }`}
                    >
                      <Checkbox
                        id={`pending-${assignment.id}`}
                        checked={assignment.completed}
                        onCheckedChange={() => toggleComplete(assignment.id)}
                      />
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <label htmlFor={`pending-${assignment.id}`} className="font-medium">
                            {assignment.title}
                          </label>
                          <div className="flex items-center gap-2">
                            <span className={`text-xs ${getStatusColor(assignment.dueDate, assignment.completed)}`}>
                              {isPast(new Date(assignment.dueDate)) ? "Overdue" : "Pending"}
                            </span>
                            {getStatusIcon(assignment.dueDate, assignment.completed)}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">{assignment.description}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Calendar className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">
                            Due: {format(new Date(assignment.dueDate), "MMMM d, yyyy")}
                          </span>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-secondary">{assignment.category}</span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="completed" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Completed Assignments</CardTitle>
              <CardDescription>Assignments you've already finished</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredAssignments.length === 0 ? (
                  <div className="text-center py-6">
                    <p className="text-muted-foreground">No completed assignments</p>
                  </div>
                ) : (
                  filteredAssignments.map((assignment) => (
                    <div key={assignment.id} className="flex items-start gap-4 p-4 border rounded-lg bg-muted/30">
                      <Checkbox
                        id={`completed-${assignment.id}`}
                        checked={assignment.completed}
                        onCheckedChange={() => toggleComplete(assignment.id)}
                      />
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <label
                            htmlFor={`completed-${assignment.id}`}
                            className="font-medium line-through text-muted-foreground"
                          >
                            {assignment.title}
                          </label>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-green-500 dark:text-green-400">Completed</span>
                            <CheckCircle2 className="h-5 w-5 text-green-500 dark:text-green-400" />
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">{assignment.description}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Calendar className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">
                            Due: {format(new Date(assignment.dueDate), "MMMM d, yyyy")}
                          </span>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-secondary">{assignment.category}</span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="overdue" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Overdue Assignments</CardTitle>
              <CardDescription>Assignments past their due date</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredAssignments.length === 0 ? (
                  <div className="text-center py-6">
                    <p className="text-muted-foreground">No overdue assignments</p>
                  </div>
                ) : (
                  filteredAssignments.map((assignment) => (
                    <div
                      key={assignment.id}
                      className="flex items-start gap-4 p-4 border border-red-200 dark:border-red-800 rounded-lg"
                    >
                      <Checkbox
                        id={`overdue-${assignment.id}`}
                        checked={assignment.completed}
                        onCheckedChange={() => toggleComplete(assignment.id)}
                      />
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <label htmlFor={`overdue-${assignment.id}`} className="font-medium">
                            {assignment.title}
                          </label>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-red-500 dark:text-red-400">Overdue</span>
                            <XCircle className="h-5 w-5 text-red-500 dark:text-red-400" />
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">{assignment.description}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Calendar className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">
                            Due: {format(new Date(assignment.dueDate), "MMMM d, yyyy")}
                          </span>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-secondary">{assignment.category}</span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="upcoming" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Assignments</CardTitle>
              <CardDescription>Assignments with future due dates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredAssignments.length === 0 ? (
                  <div className="text-center py-6">
                    <p className="text-muted-foreground">No upcoming assignments</p>
                  </div>
                ) : (
                  filteredAssignments.map((assignment) => (
                    <div key={assignment.id} className="flex items-start gap-4 p-4 border rounded-lg">
                      <Checkbox
                        id={`upcoming-${assignment.id}`}
                        checked={assignment.completed}
                        onCheckedChange={() => toggleComplete(assignment.id)}
                      />
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <label htmlFor={`upcoming-${assignment.id}`} className="font-medium">
                            {assignment.title}
                          </label>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-yellow-500 dark:text-yellow-400">Pending</span>
                            <Clock className="h-5 w-5 text-yellow-500 dark:text-yellow-400" />
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">{assignment.description}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Calendar className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">
                            Due: {format(new Date(assignment.dueDate), "MMMM d, yyyy")}
                          </span>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-secondary">{assignment.category}</span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Replace the category TabsContent blocks with conditional rendering */}
        {filter === "speech" && (
          <div className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Speech Assignments</CardTitle>
                <CardDescription>View all speech assignments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredAssignments.length === 0 ? (
                    <div className="text-center py-6">
                      <p className="text-muted-foreground">No speech assignments found</p>
                    </div>
                  ) : (
                    filteredAssignments.map((assignment) => (
                      <div
                        key={assignment.id}
                        className={`flex items-start gap-4 p-4 border rounded-lg ${
                          assignment.completed
                            ? "bg-muted/30"
                            : !assignment.completed && isPast(new Date(assignment.dueDate))
                              ? "border-red-200 dark:border-red-800"
                              : ""
                        }`}
                      >
                        <Checkbox
                          id={`speech-${assignment.id}`}
                          checked={assignment.completed}
                          onCheckedChange={() => toggleComplete(assignment.id)}
                        />
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center justify-between">
                            <label
                              htmlFor={`speech-${assignment.id}`}
                              className={`font-medium ${assignment.completed ? "line-through text-muted-foreground" : ""}`}
                            >
                              {assignment.title}
                            </label>
                            <div className="flex items-center gap-2">
                              <span className={`text-xs ${getStatusColor(assignment.dueDate, assignment.completed)}`}>
                                {assignment.completed
                                  ? "Completed"
                                  : isPast(new Date(assignment.dueDate))
                                    ? "Overdue"
                                    : "Pending"}
                              </span>
                              {getStatusIcon(assignment.dueDate, assignment.completed)}
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground">{assignment.description}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Calendar className="h-3 w-3 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">
                              Due: {format(new Date(assignment.dueDate), "MMMM d, yyyy")}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {filter === "outline" && (
          <div className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Outline Assignments</CardTitle>
                <CardDescription>View all outline assignments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredAssignments.length === 0 ? (
                    <div className="text-center py-6">
                      <p className="text-muted-foreground">No outline assignments found</p>
                    </div>
                  ) : (
                    filteredAssignments.map((assignment) => (
                      <div
                        key={assignment.id}
                        className={`flex items-start gap-4 p-4 border rounded-lg ${
                          assignment.completed
                            ? "bg-muted/30"
                            : !assignment.completed && isPast(new Date(assignment.dueDate))
                              ? "border-red-200 dark:border-red-800"
                              : ""
                        }`}
                      >
                        <Checkbox
                          id={`outline-${assignment.id}`}
                          checked={assignment.completed}
                          onCheckedChange={() => toggleComplete(assignment.id)}
                        />
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center justify-between">
                            <label
                              htmlFor={`outline-${assignment.id}`}
                              className={`font-medium ${assignment.completed ? "line-through text-muted-foreground" : ""}`}
                            >
                              {assignment.title}
                            </label>
                            <div className="flex items-center gap-2">
                              <span className={`text-xs ${getStatusColor(assignment.dueDate, assignment.completed)}`}>
                                {assignment.completed
                                  ? "Completed"
                                  : isPast(new Date(assignment.dueDate))
                                    ? "Overdue"
                                    : "Pending"}
                              </span>
                              {getStatusIcon(assignment.dueDate, assignment.completed)}
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground">{assignment.description}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Calendar className="h-3 w-3 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">
                              Due: {format(new Date(assignment.dueDate), "MMMM d, yyyy")}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {filter === "paper" && (
          <div className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Paper Assignments</CardTitle>
                <CardDescription>View all paper assignments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredAssignments.length === 0 ? (
                    <div className="text-center py-6">
                      <p className="text-muted-foreground">No paper assignments found</p>
                    </div>
                  ) : (
                    filteredAssignments.map((assignment) => (
                      <div
                        key={assignment.id}
                        className={`flex items-start gap-4 p-4 border rounded-lg ${
                          assignment.completed
                            ? "bg-muted/30"
                            : !assignment.completed && isPast(new Date(assignment.dueDate))
                              ? "border-red-200 dark:border-red-800"
                              : ""
                        }`}
                      >
                        <Checkbox
                          id={`paper-${assignment.id}`}
                          checked={assignment.completed}
                          onCheckedChange={() => toggleComplete(assignment.id)}
                        />
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center justify-between">
                            <label
                              htmlFor={`paper-${assignment.id}`}
                              className={`font-medium ${assignment.completed ? "line-through text-muted-foreground" : ""}`}
                            >
                              {assignment.title}
                            </label>
                            <div className="flex items-center gap-2">
                              <span className={`text-xs ${getStatusColor(assignment.dueDate, assignment.completed)}`}>
                                {assignment.completed
                                  ? "Completed"
                                  : isPast(new Date(assignment.dueDate))
                                    ? "Overdue"
                                    : "Pending"}
                              </span>
                              {getStatusIcon(assignment.dueDate, assignment.completed)}
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground">{assignment.description}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Calendar className="h-3 w-3 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">
                              Due: {format(new Date(assignment.dueDate), "MMMM d, yyyy")}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {filter === "discussion" && (
          <div className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Discussion Assignments</CardTitle>
                <CardDescription>View all discussion assignments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredAssignments.length === 0 ? (
                    <div className="text-center py-6">
                      <p className="text-muted-foreground">No discussion assignments found</p>
                    </div>
                  ) : (
                    filteredAssignments.map((assignment) => (
                      <div
                        key={assignment.id}
                        className={`flex items-start gap-4 p-4 border rounded-lg ${
                          assignment.completed
                            ? "bg-muted/30"
                            : !assignment.completed && isPast(new Date(assignment.dueDate))
                              ? "border-red-200 dark:border-red-800"
                              : ""
                        }`}
                      >
                        <Checkbox
                          id={`discussion-${assignment.id}`}
                          checked={assignment.completed}
                          onCheckedChange={() => toggleComplete(assignment.id)}
                        />
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center justify-between">
                            <label
                              htmlFor={`discussion-${assignment.id}`}
                              className={`font-medium ${assignment.completed ? "line-through text-muted-foreground" : ""}`}
                            >
                              {assignment.title}
                            </label>
                            <div className="flex items-center gap-2">
                              <span className={`text-xs ${getStatusColor(assignment.dueDate, assignment.completed)}`}>
                                {assignment.completed
                                  ? "Completed"
                                  : isPast(new Date(assignment.dueDate))
                                    ? "Overdue"
                                    : "Pending"}
                              </span>
                              {getStatusIcon(assignment.dueDate, assignment.completed)}
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground">{assignment.description}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Calendar className="h-3 w-3 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">
                              Due: {format(new Date(assignment.dueDate), "MMMM d, yyyy")}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </Tabs>
    </div>
  )
}

