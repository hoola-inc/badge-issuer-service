const CourseSchema = require('../models/badge.model');
const fs = require('fs');
const ipfs = require('../../config/ipfs.config');
const updateJsonFile = require('update-json-file')


exports.createNewCourse = async (req, res, next) => {
    const course = await courseExist(req);
    if (course) {
        return res.status(200).json({
            status: false,
            message: 'course already exist'
        })
    } else {
        const newCourse = new CourseSchema(req.body);
        newCourse.save()
            .then(data => {
                writeToFile(data, res);
            })
            .catch(err => {
                next(err.message);
            })
    }
}

function writeToFile(courseData, res) {
    const path = require('path').join(__dirname, '../../json/course-badgee.json');
    fs.readFile(path, 'utf8', function readFileCallback(err, data) {
        if (err) {
            console.log(err);
        } else {
            obj = JSON.parse(data); //now it an object
            writeToFileObj(courseData);
            json = JSON.stringify(obj); //convert it back to json
            fs.writeFile(path, json, 'utf8', (err) => {
                if (err) {
                    throw new Error('Error occured while writing to file')
                } else {
                    return res.status(200).json({
                        status: true,
                        message: "Successfulle created and write to file"
                    })
                }
            }); // write it back 
        }
    });
}

exports.displayCourseBadge = (req, res, next) => {
    const path = require('path').join(__dirname, '../../json/course-badgee.json');
    const fileContents = fs.readFileSync(path, 'utf8');
    try {
        const data = JSON.parse(fileContents);
        return res.status(200).json({
            status: true,
            data: data
        })
    } catch (err) {
        next(err.message);
    }
}


const courseExist = async (req) => {
    const checkCourse = await CourseSchema.find({
        course_name: req.body.course_name
    });
    if (checkCourse.length > 0) {
        return true
    } else {
        return false;
    }
}


exports.getAllCourses = (req, res, next) => {
    CourseSchema.find()
        .then(data => {
            if (data.length > 0) {
                return res.status(200).json({
                    status: true,
                    data: data
                })
            } else {
                return res.status(200).json({
                    status: false,
                    data: 'record not found'
                })
            }
        })
        .catch(err => {
            next(err.message);
        })
}

function writeToFileObj(courseData) {
    obj.claim[0].badge.course_name = courseData.course_name;
    obj.claim[0].badge.course_code = courseData.course_code;
    obj.claim[0].badge.course_description = courseData.course_description;
    obj.claim[0].badge.course_grading_schema = courseData.course_grading_schema;
    obj.claim[0].badge.course_tags = courseData.course_tags;
    obj.claim[0].badge.course_issuer = courseData.course_issuer;
    obj.claim[0].badge.course_allignment = courseData.course_allignment;
}
