import Router from 'express';
import { getAllUsers, signup, login, deleteUser, getUserById} from '../controllers/user-controllers';

// validation is to be put in here

const userRouter=Router();

userRouter.get("/", getAllUsers);
userRouter.get("/:id", getUserById);
userRouter.post("/signup", signup);
userRouter.post("/login", login);
userRouter.delete("/:id",deleteUser);

export default userRouter;