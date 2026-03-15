import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a course title'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
    },
    instructor: {
      type: String,
      required: [true, 'Please add instructor name'],
    },
    category: {
      type: String,
      required: [true, 'Please add a category'],
      enum: ['Programming', 'Web Development', 'Data Science', 'Machine Learning', 'Database', 'DevOps', 'All'],
    },
    price: {
      type: Number,
      required: [true, 'Please add a price'],
    },
    thumbnail: {
      type: String,
      required: [true, 'Please add a thumbnail URL'],
    },
    duration: {
      type: String,
      required: [true, 'Please add course duration'],
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    youtubePlaylistId: {
      type: String,
    },
    lessons: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lesson',
      },
    ],
    enrolledStudents: {
      type: Number,
      default: 0,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Course = mongoose.model('Course', courseSchema);

export default Course;
