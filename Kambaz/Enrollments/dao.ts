import { v4 as uuidv4 } from "uuid";
export default function enrollmentsDao(db) {
  function enrollUserInCourse(userId, courseId) {
    const { enrollments } = db;
    enrollments.push({ _id: uuidv4(), user: userId, course: courseId });
  }
  return { enrollUserInCourse };
}
