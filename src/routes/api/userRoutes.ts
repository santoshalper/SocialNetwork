import { Router } from "express";
const router = Router();
import { 
    getAllUsers, 
    getOneUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend } from "../../controllers/userController.js";

router.route('/').get(getAllUsers).post(createUser);

router.route('/:userId').get(getOneUser).put(updateUser).delete(deleteUser);

router.route('/:userId/friends/:friendsId').post(addFriend).delete(removeFriend);

export { router as userRouter }