import { generateQuiz } from '../services/geminiService';
import Progress from '../models/Progress';

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

export const evaluateQuiz = async (req, res) => {
  try {
    const { answers, questions } = req.body;
    let score = 0;
    let analysis = '';

    // Calculate score
    questions.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        score += 20; // Each question worth 20 points
      }
    });

    // Generate analysis using Gemini
    analysis = await generateQuizAnalysis(questions, answers, score);

    res.json({ score, analysis });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}; 