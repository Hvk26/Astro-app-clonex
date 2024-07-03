const express = require('express');
const Reports = require('../model/Reports');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const {userId, reportId, name, email, phoneNumber, issue} = req.body;
    const grievance = new Reports({
      userId,
      reportId,
      name,
      email,
      phoneNumber,
      issue,
    });
    await grievance.save();
    res.status(200).json({reportId});
  } catch (error) {
    console.error('Error saving grievance:', error);
    res
      .status(500)
      .json({error: 'An error occurred while saving the grievance.'});
  }
});

router.get('/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const getGrievance = await Reports.find({userId});

    if (getGrievance.length === 0) {
      return res.status(404).json({error: 'No grievance found'});
    }
    res.status(200).json(getGrievance);
  } catch (error) {
    console.error('Error fetching grievance:', error);
    res.status(500).json({error: 'Internal Server Error'});
  }
});

module.exports = router;
