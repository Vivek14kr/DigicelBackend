const express = require("express")
const Quiz = require("../models/quiz")
const authenticate = require("../utils/auth")


const router = express.Router();

router.get('/', authenticate,(req, res) => {
  Quiz.find()
    .then((quizzes) => {
      res.json(quizzes);
    })
    .catch((error) => {
      res.status(500).json({ message: 'Error fetching quizzes', error });
    });
});
router.get('/random',(req, res) => {
  Quiz.aggregate([{ $sample: { size: 1 } }])
    .then((quizzes) => {
      res.json(quizzes[0].questions);
    })
    .catch((error) => {
      res.status(500).json({ message: 'Error fetching quiz', error });
    });
});

router.get('/:id', authenticate,(req, res) => {
  Quiz.findById(req.params.id)
    .then((quiz) => {
      if (!quiz) {
        res.status(404).json({ message: 'Quiz not found' });
      } else {
        res.json(quiz);
      }
    })
    .catch((error) => {
      res.status(500).json({ message: 'Error fetching quiz', error });
    });
});

router.post('/', authenticate, async (req, res) => {
  const { questions } = req.body;

  console.log(questions)
  const quiz = await Quiz.create(req.body);
  console.log(quiz, 'check hvhv')

  return res.status(201).send(quiz)

});

router.patch('/:id', authenticate, (req, res) => {
  Quiz.findById(req.params.id)
    .then((quiz) => {
      if (!quiz) {
        res.status(404).json({ message: 'Quiz not found' });
      } else if (quiz.owner.toString() !== req.user.id) {
        res.status(403).json({ message: 'Unauthorized to edit quiz' });
      } else {
      
        quiz.questions = req.body.questions;

        quiz.save()
          .then(() => {
            res.json({ message: 'Quiz updated successfully' });
          })
          .catch((error) => {
            res.status(500).json({ message: 'Error updating quiz', error });
          });
      }
    })
    .catch((error) => {
      res.status(500).json({ message: 'Error finding quiz', error });
    });
});
router.delete('/:id', authenticate, (req, res) => {
    Quiz.findById(req.params.id)
      .then((quiz) => {
        if (!quiz) {
          res.status(404).json({ message: 'Quiz not found' });
        } else if (quiz.owner.toString() !== req.user.id) {
          res.status(403).json({ message: 'Unauthorized to delete quiz' });
        } else {
          quiz.delete()
            .then(() => {
              res.json({ message: 'Quiz deleted successfully' });
            })
            .catch((error) => {
              res.status(500).json({ message: 'Error deleting quiz', error });
            });
        }
      })
      .catch((error) => {
        res.status(500).json({ message: 'Error finding quiz', error });
      });
  });
  
  module.exports = router