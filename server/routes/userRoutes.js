import { changePasswordController, createUserController, deleteAllUsersController, deleteUserController, getAllUsersController, getUserByIdController, loginUserController, registerUserController, resetUsersController, updateUserController } from "../controllers/UserController.js";
import express from "express";
const router = express.Router();
router.get("/",getAllUsersController);

router.get("/:id", getUserByIdController);

router.post("/resetUsers",resetUsersController);

router.post("/",createUserController);

router.delete("/:id",deleteUserController);

router.delete("/",deleteAllUsersController);

router.put("/:id",updateUserController);


router.post("/register", registerUserController);


router.post("/login", loginUserController);


router.post("/:id/password", changePasswordController);

export default router;