import mongoose from 'mongoose';

const lessonSchema = new mongoose.Schema(
  {
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
    },
    title: {
      type: String,
      required: [true, 'Please add a lesson title'],
    },
    youtubeVideoId: {
      type: String,
      required: [true, 'Please add YouTube video ID'],
    },
    duration: {
      type: String,
      required: [true, 'Please add lesson duration'],
    },
    order: {
      type: Number,
      required: [true, 'Please add lesson order'],
    },
    isFree: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Lesson = mongoose.model('Lesson', lessonSchema);

export default Lesson;
