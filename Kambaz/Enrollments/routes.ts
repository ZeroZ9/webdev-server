import enrollmentsDao from "./dao";

export default function EnrollmentRoutes(app, db) {
  const dao = enrollmentsDao(db);

  const getUserId = (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return null;
    }
    return currentUser._id;
  };

  const enrollUserInCourse = (req, res) => {
    const userId = getUserId(req, res);
    if (!userId) return;
    dao.enrollUserInCourse(userId, req.params.courseId);
    res.sendStatus(200);
  };

  const unEnrollUserInCourse = (req, res) => {
    const userId = getUserId(req, res);
    if (!userId) return;
    dao.unEnrollUserInCourse(userId, req.params.courseId);
    res.sendStatus(200);
  };

  const findMyEnrollments = (req, res) => {
    const userId = getUserId(req, res);
    if (!userId) return;
    res.json(dao.findEnrollmentsForUser(userId));
  };

  app.get("/api/users/current/enrollments", findMyEnrollments);
  app.post("/api/courses/:courseId/enrollments", enrollUserInCourse);
  app.delete("/api/courses/:courseId/enrollments", unEnrollUserInCourse);
}
