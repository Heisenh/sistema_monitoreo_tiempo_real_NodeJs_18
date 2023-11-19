import { Router } from 'express'
import validateLoginDTO from '../dto/validateLoginDto.js';
import userModel from '../schemas/userSchema.js';

const authRouter = Router();

// Login
authRouter.post( '/', validateLoginDTO, async(req, res) => {

  const { user, password } = req.body;

  const userData = await userModel.find({ user, password }).exec();

  if (!userData.length) return res.status(404).send();

  const newUser = userData.map((data) => {
    return {
      id: data._id,
      user: data.user
    };
  });

  return res.send(newUser[0]);

});

export default authRouter;
