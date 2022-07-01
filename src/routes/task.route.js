const router = require('express').Router();
const { taskController } = require('../controllers');

router.get('/all', taskController.getTasks);
router.get('/:id', taskController.getTaskById);
router.post('/createTask', taskController.createTask);
router.put('/update/:id', taskController.updateTask);
router.delete('delete/:id', taskController.deleteTask);
module.exports = router;
