"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Download, FileText, Calculator, ChevronDown, ChevronUp } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function SyllabusPage() {
  const [grades, setGrades] = useState({
    complexOrg: 0,
    inform: 0,
    demonstration: 0,
    persuade: 0,
    outlines: 0,
    finalPaper: 0,
    discussion: 0,
    attendance: 0,
  })

  const [finalGrade, setFinalGrade] = useState(0)
  const [letterGrade, setLetterGrade] = useState("")
  const [showFullSchedule, setShowFullSchedule] = useState(false)

  const handleGradeChange = (field: string, value: string) => {
    const numValue = Number.parseFloat(value) || 0
    setGrades({
      ...grades,
      [field]: numValue,
    })
  }

  const calculateGrade = () => {
    // Calculate weighted grade
    const weightedGrade =
      grades.complexOrg * 0.05 +
      grades.inform * 0.2 +
      grades.demonstration * 0.15 +
      grades.persuade * 0.2 +
      grades.outlines * 0.15 +
      grades.finalPaper * 0.1 +
      grades.discussion * 0.05 +
      grades.attendance * 0.1

    setFinalGrade(weightedGrade)

    // Determine letter grade
    let letter = ""
    if (weightedGrade >= 95) letter = "A"
    else if (weightedGrade >= 90) letter = "A-"
    else if (weightedGrade >= 87) letter = "B+"
    else if (weightedGrade >= 84) letter = "B"
    else if (weightedGrade >= 80) letter = "B-"
    else if (weightedGrade >= 77) letter = "C+"
    else if (weightedGrade >= 74) letter = "C"
    else if (weightedGrade >= 70) letter = "C-"
    else if (weightedGrade >= 67) letter = "D+"
    else if (weightedGrade >= 60) letter = "D"
    else letter = "F"

    setLetterGrade(letter)
  }

  // Full schedule data
  const fullSchedule = [
    {
      week: "Week 1",
      classes: [
        "January 27 - Introduction to Course and Syllabus Review",
        "January 29 - No Classes",
      ],
    },
    {
      week: "Week 2",
      classes: [
        "February 3 – Ice Breaking Exercises",
        "February 5 - Continue Ice Breaking Exercises",
      ],
    },
    {
      week: "Week 3",
      classes: [
        "February 10 - Complex Organization Speech",
        "February 12 – No Classes",
      ],
    },
    {
      week: "Week 4",
      classes: [
        "February 17- No Classes",
        "February 18 – MONDAY SCHEDULE - Guest Lecturer from Library",
        "February 19 - Lecture: Speech to Inform",
      ],
    },
    {
      week: "Week 5",
      classes: [
        "February 24 - Lecture: Speech to Inform",
        "February 26 - Lecture: Speech to Inform",
      ],
    },
    {
      week: "Week 6",
      classes: [
        "March 3 - Speeches to Inform",
        "March 5 - Speeches to Inform",
      ],
    },
    {
      week: "Week 7",
      classes: [
        "March 10 - Speeches to Inform",
        "March 12 - Lecture: Speech of Demonstration",
      ],
    },
    {
      week: "Week 8",
      classes: [
        "March 17 - No Classes (Spring Break)",
        "March 19 - No Classes (Spring Break)",
      ],
    },
    {
      week: "Week 9",
      classes: [
        "March 24 - Speeches of Demonstration",
        "March 26 - Speeches of Demonstration",
      ],
    },
    {
      week: "Week 10",
      classes: [
        "March 31 - Speeches of Demonstration",
        "April 2 - Lecture: Speech to Persuade",
      ],
    },
    {
      week: "Week 11",
      classes: [
        "April 7 - Lecture: Speech to Persuade",
        "April 9 - Lecture: Speech to Persuade",
      ],
    },
    {
      week: "Week 12",
      classes: [
        "April 14 - No Classes (Spring Holiday)",
        "April 16 - No Classes (Spring Holiday)",
      ],
    },
    {
      week: "Week 13",
      classes: [
        "April 21 - Lecture: Speech to Persuade",
        "April 23 - Lecture: Speech to Persuade",
      ],
    },
    {
      week: "Week 14",
      classes: [
        "April 28 - Speeches to Persuade",
        "April 30 - Speeches to Persuade",
      ],
    },
    {
      week: "Week 15",
      classes: [
        "May 5 - Speeches to Persuade",
        "May 7 - Final Paper Due / Course Review",
      ],
    },
  ]

  // Toggle full schedule display
  const toggleFullSchedule = () => {
    setShowFullSchedule(!showFullSchedule)
  }

  return (
    <div className="container py-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Syllabus</h1>
          <p className="text-muted-foreground">Course information, grading policy, and schedule</p>
        </div>
        <Button variant="outline" className="gap-2" asChild>
          <a href="/COM1010SYLLABUS.pdf" download>
            <Download className="h-4 w-4" />
            Download Syllabus
          </a>
        </Button>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="grading">Grading</TabsTrigger>
          <TabsTrigger value="calculator">Grade Calculator</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Course Information</CardTitle>
              <CardDescription>COM1010 Public Speaking</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg">Course Description</h3>
                <p className="text-muted-foreground">
                  This course focuses on the fundamentals of public speaking, including research, organization,
                  delivery, and the use of voice and body in speech-making.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-lg">Course Schedule</h3>
                <div className="space-y-2 mt-2">
                  {!showFullSchedule ? (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {fullSchedule.slice(0, 4).map((week, index) => (
                          <div key={index} className="p-3 border rounded-md">
                            <h4 className="font-medium">{week.week}</h4>
                            <ul className="list-disc list-inside text-sm text-muted-foreground">
                              {week.classes.map((session, idx) => (
                                <li key={idx}>{session}</li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>

                      <Button 
                        variant="outline" 
                        className="w-full flex items-center justify-center gap-2"
                        onClick={toggleFullSchedule}
                      >
                        <span>View Full Schedule</span>
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </>
                  ) : (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {fullSchedule.map((week, index) => (
                          <div key={index} className="p-3 border rounded-md">
                            <h4 className="font-medium">{week.week}</h4>
                            <ul className="list-disc list-inside text-sm text-muted-foreground">
                              {week.classes.map((session, idx) => (
                                <li key={idx}>{session}</li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>

                      <Button 
                        variant="outline" 
                        className="w-full flex items-center justify-center gap-2"
                        onClick={toggleFullSchedule}
                      >
                        <span>Hide Full Schedule</span>
                        <ChevronUp className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Key Dates</CardTitle>
              <CardDescription>Important deadlines and assignment dates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Complex Organization Speech</h4>
                    <p className="text-sm text-muted-foreground">February 10, 2025</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Speeches to Inform</h4>
                    <p className="text-sm text-muted-foreground">March 3, 2025</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Speeches of Demonstration</h4>
                    <p className="text-sm text-muted-foreground">March 24, 2025</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Speeches to Persuade</h4>
                    <p className="text-sm text-muted-foreground">April 28, 2025</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Final Paper Due</h4>
                    <p className="text-sm text-muted-foreground">May 7, 2025</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="grading" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Grade Breakdown</CardTitle>
              <CardDescription>How your final grade is calculated</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Complex Organization Speech</span>
                    <span>5%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-secondary">
                    <div className="h-full w-[5%] rounded-full bg-primary"></div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Three (3) minute duration. An unresearched "get your feet wet speech" where you think of a complex
                    organization of which you are a part, think of a problem within the organization for which you have
                    a possible
                    solution and present it to the class in an organized fashion.
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Speech to Inform</span>
                    <span>20%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-secondary">
                    <div className="h-full w-[20%] rounded-full bg-primary"></div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    A speech of five (5) to seven (7) minute duration requiring academic research and a written
                    preparation and speech outline containing the student's academic research and bibliography citing a
                    minimum of four (4) different published sources.
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Speech of Demonstration</span>
                    <span>15%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-secondary">
                    <div className="h-full w-[15%] rounded-full bg-primary"></div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    A speech of seven (7) minute duration requiring a written outline containing the student's academic
                    research and a bibliography citing a minimum of three (3) different published sources. The student
                    will research, prepare and present a speech where he or she shall attempt to show the class "how to"
                    do something.
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Speech to Persuade</span>
                    <span>20%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-secondary">
                    <div className="h-full w-[20%] rounded-full bg-primary"></div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    A speech of six (6) to eight (8) minute duration requiring academic research and a written
                    preparation and speech outline containing the student's academic research and a bibliography citing
                    a minimum of five (5) different published sources. A visual aid is required.
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Written Outlines</span>
                    <span>15%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-secondary">
                    <div className="h-full w-[15%] rounded-full bg-primary"></div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Students' written Outlines for the Speech to Inform, the Speech to Persuade and the Speech of
                    Demonstration shall each be Five (5%) percent of the final grade for a total of Fifteen (15%)
                    percent. They must be in proper outline form and include a bibliography in proper bibliography
                    format.
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Final Paper</span>
                    <span>10%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-secondary">
                    <div className="h-full w-[10%] rounded-full bg-primary"></div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Five (5) page paper that applies class concepts to real world examples. Lectures and text must be
                    cited.
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Discussion Board Postings</span>
                    <span>5%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-secondary">
                    <div className="h-full w-[5%] rounded-full bg-primary"></div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Attendance, Punctuality, Class Participation and Attitude</span>
                    <span>10%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-secondary">
                    <div className="h-full w-[10%] rounded-full bg-primary"></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calculator" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                Grade Calculator
              </CardTitle>
              <CardDescription>Calculate your expected final grade</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="complexOrg">Complex Organization Speech (5%)</Label>
                    <Input
                      id="complexOrg"
                      type="number"
                      min="0"
                      max="100"
                      placeholder="Enter your grade"
                      value={grades.complexOrg || ""}
                      onChange={(e) => handleGradeChange("complexOrg", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="inform">Speech to Inform (20%)</Label>
                    <Input
                      id="inform"
                      type="number"
                      min="0"
                      max="100"
                      placeholder="Enter your grade"
                      value={grades.inform || ""}
                      onChange={(e) => handleGradeChange("inform", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="demonstration">Speech of Demonstration (15%)</Label>
                    <Input
                      id="demonstration"
                      type="number"
                      min="0"
                      max="100"
                      placeholder="Enter your grade"
                      value={grades.demonstration || ""}
                      onChange={(e) => handleGradeChange("demonstration", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="persuade">Speech to Persuade (20%)</Label>
                    <Input
                      id="persuade"
                      type="number"
                      min="0"
                      max="100"
                      placeholder="Enter your grade"
                      value={grades.persuade || ""}
                      onChange={(e) => handleGradeChange("persuade", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="outlines">Written Outlines (15%)</Label>
                    <Input
                      id="outlines"
                      type="number"
                      min="0"
                      max="100"
                      placeholder="Enter your grade"
                      value={grades.outlines || ""}
                      onChange={(e) => handleGradeChange("outlines", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="finalPaper">Final Paper (10%)</Label>
                    <Input
                      id="finalPaper"
                      type="number"
                      min="0"
                      max="100"
                      placeholder="Enter your grade"
                      value={grades.finalPaper || ""}
                      onChange={(e) => handleGradeChange("finalPaper", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="discussion">Discussion Board Postings (5%)</Label>
                    <Input
                      id="discussion"
                      type="number"
                      min="0"
                      max="100"
                      placeholder="Enter your grade"
                      value={grades.discussion || ""}
                      onChange={(e) => handleGradeChange("discussion", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="attendance">Attendance & Participation (10%)</Label>
                    <Input
                      id="attendance"
                      type="number"
                      min="0"
                      max="100"
                      placeholder="Enter your grade"
                      value={grades.attendance || ""}
                      onChange={(e) => handleGradeChange("attendance", e.target.value)}
                    />
                  </div>
                </div>

                <Button onClick={calculateGrade} className="w-full">
                  Calculate Final Grade
                </Button>

                {finalGrade > 0 && (
                  <div className="p-4 border rounded-md bg-muted/50">
                    <div className="text-center">
                      <h3 className="text-lg font-semibold">Calculated Result</h3>
                      <div className="flex justify-center items-center gap-4 mt-2">
                        <div className="text-center">
                          <div className="text-sm text-muted-foreground">Numeric Grade</div>
                          <div className="text-3xl font-bold">{finalGrade.toFixed(1)}</div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm text-muted-foreground">Letter Grade</div>
                          <div className="text-3xl font-bold">{letterGrade}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

