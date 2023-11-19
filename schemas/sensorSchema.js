import mongoose from 'mongoose';

const sensorSchema = mongoose.Schema({
  _id: {
    type: String,
    required: false
  },
  sensor_id: {
    type: Number,
    required: true
  },
  sensor_name: {
    type: String,
    required: false
  },
  data: {
    type: Array,
    required: false
  }
});

const sensorModel = mongoose.model("sensors", sensorSchema);

export default sensorModel;
