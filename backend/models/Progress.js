import mongoose from 'mongoose';

const progressSchema = new mongoose.Schema({
  domain: String,
  subtopics: [{
    name: String,
    subItems: [{
      name: String,
      tutorial: Boolean,
      practice: Boolean,
      notes: Boolean,
      resourceLink: String
    }]
  }],
  projects: [{
    name: String,
    completed: Boolean
  }],
  lastUpdated: { type: Date, default: Date.now }
});

export default mongoose.model('Progress', progressSchema); 