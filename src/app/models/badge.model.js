const mongoose = require('mongoose');


const CourseSchema = mongoose.Schema({
        course_name: String,
        course_code: String,
        course_description: String,
        course_grading_schema: String,
        course_tags: String,
        course_issuer: String,
        course_allignment: String
}, {
                timestamps: true

        });

module.exports = mongoose.model('Course', CourseSchema);