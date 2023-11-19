import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  user: {
    type: String,
    required: true
  },
  passowrd: {
    type: String,
    required: true
  },
});

const userModel = mongoose.model("users", userSchema);

export default userModel;
