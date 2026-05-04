    const mongoose = require('mongoose')
    const { trim } = require('zod')

    const assignmentInputSchema = new mongoose.Schema({

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

        assignmentTopics: [{
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
            type:{
                type:String,
                required:true,
                enum:['MCQs Based', 'Q/A']
            },
            status: {
                type: String,
                enum: ['pending', 'uploaded'],
                default: 'pending'
            }
        }],
        // days gap between 2 assignment creation 
        assignmentGapDuration: {
            type: Number,
            required: true
        },
          job: {
        type: String,
        enum: ['pending', 'active', 'completed', 'failed'],
        default: 'pending'
    },

    createdAssignmentsCount: {
        type: Number,
        default: 0
    },

        dateOfFirstAssignmentCreated: {
            type: Date,

        }

    }, { timestamps: true })

    const assignmentTopicModel = mongoose.model('assignmentTopicModel', assignmentInputSchema)

    module.exports = assignmentTopicModel