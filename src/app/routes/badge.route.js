module.exports = app => {
    const courseController = require('../controllers/badge.controller');

    app.post('/course', courseController.createNewCourse);
    app.get('/course', courseController.getAllCourses);

    app.get('/course/:id', courseController.getCourseById);
    
    // course http url
    app.get('/newcourse', courseController.displayCourseBadge);
};