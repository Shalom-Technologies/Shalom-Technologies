# Shalom-Technologies
Shalom Technologies is a Kenyan-based platform that solves all your company's software development needs.

server/
  models/       (User.js, Project.js)
  routes/       (auth.js, projects.js)
  controllers/  (authController.js, projectController.js)
  middleware/   (auth.js, rateLimiter.js)
  services/     (openaiService.js)
  server.js
client/
  src/
    pages/      (Home, Describe, Preview, Dashboard)
    components/ (MockupFrame, TweakChat, StatusTracker)
    api/        (axios instance + calls)
    context/    (AuthContext)