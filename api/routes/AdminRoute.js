import express from "express";
import { ReadAdmin, CreateAdmin, UpdateAdmin, DeleteAdmin, ReadSingleAdmin } from "../controllers/AdminController.js";
import { LoginController } from "../controllers/LoginController.js";
import { AuthMiddleware } from "../middlewares/AuthMiddleware.js";
import { SingleAuthMiddleware } from "../middlewares/SingleAuthMiddleware.js";
const router = express.Router()

// Routes
router.route('/').get(AuthMiddleware,ReadAdmin ).post(CreateAdmin )
router.route('/:id').get(SingleAuthMiddleware,ReadSingleAdmin).patch(SingleAuthMiddleware, UpdateAdmin ).put(SingleAuthMiddleware, UpdateAdmin ).delete(SingleAuthMiddleware, DeleteAdmin )

// Login Route 
router.route('/login').post(LoginController);



export default router