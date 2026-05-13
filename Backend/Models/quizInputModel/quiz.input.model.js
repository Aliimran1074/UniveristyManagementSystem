const mongoose = require('mongoose')
const { trim } = require('zod')

const quizInputSchema = new mongoose.Schema({

    instituteId: {
        type: mongoose.Schema.ObjectId,
        ref: "instituteModel",
        required: true
    },
    instructor: {
        type: mongoose.Schema.ObjectId,
        ref: 'staffModel',
        required: true
    },
    course: {
        type: mongoose.Schema.ObjectId,
        ref: 'courseModel',
        required: true
    },

    quizTopics: [{
        topicName: {
            type: String,
            required: true,
            trim: true
        },
        source: {
            type: String,
            required: true,
            enum: ['Course_content', 'outside']
        },
        type: {
            type: String,
            required: true,
            enum: ['MCQs Based', 'Q/A']
        },
        noOfQuestions: {
            type: Number,
            required: true
        },
        difficultyLevel: {
            type: String,
            enum: ['easy', 'medium', 'hard'],
            required: true
        },
        status: {
            type: String,
            enum: ['pending', 'uploaded'],
            default: 'pending'
        },
        dateOfCreation: {
            type: Date
        },
        totalMarks: {
            type: Number,
            required: true
        }
    }],
    // days gap between 2 assignment creation 
    quizGapDuration: {
        type: Number,
        required: true
    },
    job: {
        type: String,
        enum: ['pending', 'active', 'completed', 'failed'],
        default: 'pending'
    },

    createdQuizCount: {
        type: Number,
        default: 0
    },

    dateOfLastQuizCreated: {
        type: Date,

    }

}, { timestamps: true })

const quizTopicModel = mongoose.model('quizTopicModel', quizInputSchema)

module.exports = quizTopicModel

