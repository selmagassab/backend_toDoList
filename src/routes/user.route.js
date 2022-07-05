const express = require('express');
// const auth = require('../middlewares/auth');
// const { validate } = require('../middlewares/validate');
// const userValidation = require('../validations/user.validation');
const { userController } = require('../controllers');

const router = express.Router();

// router.get('/get-office-staff', auth('secretary'), userController.getOfficeStaff);
// router.get('/get-other-office-staff', auth('secretary'), userController.getOtherOfficesStaff);
// router.get('/get-office-meds', auth('secretary'), userController.getOfficeMeds);

// router.get('/search-doctor', auth('secretary'), userController.searchDoctor);
// router.put('/doctor-status/:id', auth('doctor'), userController.updateUserStatus);

// users handling
// router.get('/me', auth(), userController.userdata);
// router.post('/create-admin', validate(userValidation.createAdmin), userController.createAdmin);
router.get('/get-all-users', userController.getUsers);
router.post('/create-user', userController.createUser);
// router.put('/:id', auth('admin'), userController.updateUser);
// router.delete('/:id', validate(userValidation.deleteUser), userController.deleteUser);
// router.get('/get-user-details/:id', auth('admin'), userController.userInfoByAdmin);
module.exports = router;
