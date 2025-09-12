import StudentViewHeader from "@/components/student-view/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { AuthContext } from "@/context/auth-context";
import { StudentContext } from "@/context/student-context";
import { LoaderCircle, Watch } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const StudentCourses = () => {
  const [animated, setAnimated] = useState(true);
  const { boughtCourses, loadingState } = useContext(StudentContext);
  const navigate = useNavigate();
  useEffect(() => {
    window.setTimeout(() => {
      setAnimated(false);
    }, 100);
  }, []);
  useEffect(() => {
    if (loadingState) setAnimated(true);
    if (!loadingState) {
      const animation = window.setTimeout(() => {
        setAnimated(false);
        window.clearTimeout(animation);
      }, 100);
    }
  }, [loadingState]);

  return (
    <div>
      {loadingState && (
        <div className="w-full h-full flex items-center justify-center bg-[rgb(240,240,240,0.5)] z-10 absolute top-0 left-0">
          <LoaderCircle className="animate-spin h-10 w-10" />
        </div>
      )}
      <StudentViewHeader />
      <div className="p-4">
        <h1 className="text-3xl font-bold mb-8">My Courses</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {boughtCourses && boughtCourses.length > 0 ? (
            boughtCourses.map((course) => (
              <Card
                key={course.courseId}
                className={`flex flex-col transition-all duration-700 ${
                  animated && `-translate-y-5 opacity-0`
                }`}
              >
                <CardContent className="p-4 flex-grow">
                  <img
                    src={course?.courseImage}
                    alt={course?.title}
                    className="h-52 w-full object-cover rounded-md mb-4"
                  />
                  <h3 className="font-bold mb-1 capitalize">{course?.title}</h3>
                  <p className="text-sm text-gray-700 mb-2">
                    {course?.instructorName}
                  </p>
                </CardContent>
                <CardFooter>
                  <Button
                    className="flex-1 cursor-pointer"
                    onClick={() =>
                      navigate(`/courses/course-progress/${course.courseId}`)
                    }
                  >
                    <Watch className="mr-2 h-4 w-4" />
                    Start Watching
                  </Button>
                </CardFooter>
              </Card>
            ))
          ) : (
            <h1 className="text-3xl font-bold">No Courses found</h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentCourses;
