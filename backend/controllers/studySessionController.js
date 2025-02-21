const { studySessionService } = require('../services/studySessionService');

const studySessionController = {
  async createSession(req, res) {
    try {
      const session = await studySessionService.createSession(req.body);
      res.json(session);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getSessionsByDomain(req, res) {
    try {
      const { domain } = req.params;
      const sessions = await studySessionService.getSessionsByDomain(domain);
      res.json(sessions);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getWeeklyStats(req, res) {
    try {
      const { domain } = req.params;
      const stats = await studySessionService.getWeeklyStats(domain);
      res.json(stats);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = { studySessionController }; 