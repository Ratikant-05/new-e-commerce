import { Router } from "express";
import { loginController, logoutController, signupController, updateProfile } from "../Controller/AuthController.js";
const router = Router();

// signup route
router.post('/signup', signupController);

// login route
router.post('/login', loginController);

// logout route
router.post('/logout', logoutController);

// update profile
// router.post('/updateProfile', updateProfile);
export default router;