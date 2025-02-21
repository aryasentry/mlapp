import Progress from '../models/Progress';
import { generateQuiz, getMotivationalQuote } from '../services/geminiService';

export const updateProgress = async (req, res) => {
  try {
    const { domain, topicIndex, itemIndex, type, value } = req.body;
    
    let progress = await Progress.findOne({ domain });
    
    if (!progress) {
      progress = new Progress({ domain });
    }

    progress.subtopics[topicIndex].subItems[itemIndex][type] = value;
    progress.lastUpdated = new Date();
    
    await progress.save();
    
    res.json({ success: true, progress });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getProgress = async (req, res) => {
  try {
    const { domain } = req.params;
    const progress = await Progress.findOne({ domain });
    res.json(progress || { domain, subtopics: [], projects: [] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateResourceLink = async (req, res) => {
  try {
    const { domain, topicIndex, itemIndex, link } = req.body;
    
    let progress = await Progress.findOne({ domain });
    if (!progress) {
      progress = new Progress({ domain });
    }

    progress.subtopics[topicIndex].subItems[itemIndex].resourceLink = link;
    progress.lastUpdated = new Date();
    
    await progress.save();
    
    res.json({ success: true, progress });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const generateQuizQuestions = async (req, res) => {
  try {
    const { domain } = req.body;
    const progress = await Progress.findOne({ domain });
    
    const questions = await generateQuiz(domain, progress);
    res.json({ questions });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getDailyQuote = async (req, res) => {
  try {
    const quote = await getMotivationalQuote();
    res.json({ quote });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}; 