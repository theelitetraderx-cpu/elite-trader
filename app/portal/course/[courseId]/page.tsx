import { redirect } from "next/navigation";

// This page catches the click from the CourseCard and immediately routes
// the user to the first lesson of that course to begin the viewing experience.
export default function CourseRedirectPage({ params }) {
  // In a fully dynamic app, you would query Supabase for `lessons` where `course_id = params.courseId`
  // and redirect to the first one based on `order_index`.
  //
  // Since we are currently using hardcoded mock videos for the Basic Plan, we route them specifically to `l1`.
  
  redirect("/portal/lesson/l1");
}
