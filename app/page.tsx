"use client"

import { useEffect, useState, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarIcon, Clock } from "lucide-react"
import { format } from "date-fns"
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import timeGridPlugin from "@fullcalendar/timegrid"
import interactionPlugin from "@fullcalendar/interaction"

// Course data
const assignments = [
  { title: "Complex Organization Speech", date: "2025-02-10", type: "assignment" },
  { title: "Speeches to Inform", date: "2025-03-03", type: "assignment" },
  { title: "Speeches of Demonstration", date: "2025-03-24", type: "assignment" },
  { title: "Speeches to Persuade", date: "2025-04-28", type: "assignment" },
]

const courseDates = [
  { title: "Introduction to Course", date: "2025-01-27", type: "class" },
  { title: "Ice Breaking Exercises", date: "2025-02-03", type: "class" },
  { title: "Continue Ice Breaking Exercises", date: "2025-02-05", type: "class" },
  { title: "Complex Organization Speech", date: "2025-02-10", type: "class" },
  { title: "Guest Lecturer from Library", date: "2025-02-18", type: "class" },
  { title: "Lecture: Speech to Inform", date: "2025-02-19", type: "class" },
  { title: "Lecture: Verbal and Visual Means of Support", date: "2025-02-24", type: "class" },
  { title: "Speeches to Inform Begin", date: "2025-02-26", type: "class" },
  { title: "Continue Speeches to Inform", date: "2025-03-03", type: "class" },
  { title: "Continue Speeches to Inform", date: "2025-03-05", type: "class" },
  { title: "Continue Speeches to Inform", date: "2025-03-06", type: "class" },
  { title: "Continue Speeches to Inform", date: "2025-03-10", type: "class" },
  { title: "Complete Speeches to Inform", date: "2025-03-12", type: "class" },
  { title: "Lecture: Speech of Demonstration", date: "2025-03-17", type: "class" },
  { title: "Begin Speeches of Demonstration", date: "2025-03-19", type: "class" },
  { title: "Continue Speeches of Demonstration", date: "2025-03-24", type: "class" },
  { title: "Continue Speeches of Demonstration", date: "2025-03-26", type: "class" },
  { title: "Continue Speeches of Demonstration", date: "2025-04-02", type: "class" },
  { title: "Complete Speeches of Demonstration", date: "2025-04-07", type: "class" },
  { title: "Lecture: Speech to Persuade", date: "2025-04-09", type: "class" },
  { title: "FDR's Day of Infamy Speech Analysis", date: "2025-04-21", type: "class" },
  { title: "Begin Speeches to Persuade", date: "2025-04-23", type: "class" },
  { title: "Continue Speeches to Persuade", date: "2025-04-28", type: "class" },
  { title: "Continue Speeches to Persuade", date: "2025-04-30", type: "class" },
  { title: "Continue Speeches to Persuade", date: "2025-05-05", type: "class" },
  { title: "Continue Speeches to Persuade (Final Paper Due)", date: "2025-05-07", type: "class" },
  { title: "Complete Speeches to Persuade", date: "2025-05-12", type: "class" },
  { title: "Course Concludes", date: "2025-05-14", type: "class" },
  { title: "Spring Recess Begins", date: "2025-04-12", type: "break" },
  { title: "Spring Recess Ends", date: "2025-04-20", type: "break" },
]

export default function Home() {
  const [upcomingAssignments, setUpcomingAssignments] = useState<any[]>([])
  const [calendarEvents, setCalendarEvents] = useState<any[]>([])
  const [shouldAnimate, setShouldAnimate] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Get today's date
    const today = new Date()

    // Filter upcoming assignments
    const upcoming = assignments
      .filter((assignment) => new Date(assignment.date) >= today)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(0, 3)

    setUpcomingAssignments(upcoming)

    // Prepare calendar events
    const events = [
      ...assignments.map((assignment) => ({
        title: assignment.title,
        start: assignment.date,
        backgroundColor: "#3b82f6",
        borderColor: "#3b82f6",
        textColor: "#ffffff",
        allDay: true,
      })),
      ...courseDates.map((date) => ({
        title: date.title,
        start: date.date,
        backgroundColor: date.type === "break" ? "#f97316" : "#10b981",
        borderColor: date.type === "break" ? "#f97316" : "#10b981",
        textColor: "#ffffff",
        allDay: true,
      })),
    ]

    setCalendarEvents(events)
  }, [])

  useEffect(() => {
    // Check if this is the first visit
    const hasVisitedBefore = localStorage.getItem('hasVisitedBefore')
    
    if (!hasVisitedBefore) {
      // First visit - animate and set flag
      setShouldAnimate(true)
      localStorage.setItem('hasVisitedBefore', 'true')
    }
  }, [])

  return (
    <div 
      ref={contentRef}
      className={`container py-6 space-y-8 content-container ${shouldAnimate ? 'animate-in' : ''}`}
    >
      <section className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">COM1010 Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to your COM1010 Public Speaking utility tool. Track assignments, view course materials, and stay
          organized.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Upcoming Assignments</CardTitle>
            <CardDescription>Your next deadlines</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingAssignments.map((assignment, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="rounded-full p-2 bg-primary/10">
                    <CalendarIcon className="h-4 w-4 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <p className="font-medium">{assignment.title}</p>
                    <p className="text-sm text-muted-foreground flex items-center">
                      <Clock className="mr-1 h-3 w-3" />
                      Due {format(new Date(assignment.date), "MMMM d, yyyy")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Course Progress</CardTitle>
            <CardDescription>Track your journey through COM1010</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">Complex Organization Speech</span>
                  <span>5%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-secondary">
                  <div className="h-full w-[5%] rounded-full bg-primary"></div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">Speech to Inform</span>
                  <span>20%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-secondary">
                  <div className="h-full w-[20%] rounded-full bg-primary"></div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">Speech of Demonstration</span>
                  <span>15%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-secondary">
                  <div className="h-full w-[15%] rounded-full bg-primary"></div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">Speech to Persuade</span>
                  <span>20%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-secondary">
                  <div className="h-full w-[20%] rounded-full bg-primary"></div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">Written Outlines</span>
                  <span>15%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-secondary">
                  <div className="h-full w-[15%] rounded-full bg-primary"></div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">Final Paper</span>
                  <span>10%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-secondary">
                  <div className="h-full w-[10%] rounded-full bg-primary"></div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">Discussion Board Postings</span>
                  <span>5%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-secondary">
                  <div className="h-full w-[5%] rounded-full bg-primary"></div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">Attendance & Participation</span>
                  <span>10%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-secondary">
                  <div className="h-full w-[10%] rounded-full bg-primary"></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Course Calendar</h2>
        <Card>
          <CardContent className="p-0 sm:p-6">
            <div className="calendar-container">
              <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                headerToolbar={{
                  left: "prev,next today",
                  center: "title",
                  right: "dayGridMonth,timeGridWeek",
                }}
                events={calendarEvents}
                height="auto"
                aspectRatio={1.5}
              />
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}

