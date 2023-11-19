import { Router } from 'express'
import { format } from 'date-fns';
import sensorModel from '../schemas/sensorSchema.js';
import getNumRandom from '../helpers/numRandom.js';
import getQuality from '../helpers/getQuality.js';

const sensorsRouter = Router();

// getSensors
sensorsRouter.get('/getAllSensors', async(req, res) => {

  const sensor = await sensorModel.find({}).exec();

  if (!sensor.length) return res.status(404).send();

  return res.send(sensor);

});


// getSensors
sensorsRouter.get('/getSensorById/:id', async(req, res) => {

  const { id } = req.params;
  
  const sensor = await sensorModel.find({ sensor_id: parseInt(id) }).exec();

  if (!sensor.length) return res.status(404).send();
  
  return res.send(sensor[0]);

});


// regNewSensor
sensorsRouter.post('/regNewSensor', async(req, res) => {

  const { sensor_id } = req.body;

  const nuevaFecha = new Date();
  const fecha = format(nuevaFecha, 'yyyy-MM-dd\'T\'HH:mm:ss');

  let dataNew;

  switch (sensor_id) {
    case 1:
      dataNew = {
        timestamp: fecha,
        temperature: getNumRandom(100, 30),
        humidity: getNumRandom(100, 30)
      };
      break;
    case 2:
      dataNew = {
        timestamp: fecha,
        pressure: getNumRandom(1010, 700),
        wind_speed: getNumRandom(20,0)
      };
      break;
    case 3:
      const noiseForQuality = getNumRandom(50,30);
      dataNew = {
        timestamp: fecha,
        noise_level: getNumRandom(50,30),
        air_quality: getQuality(noiseForQuality)
      };
      break;
    default:
      break;
  }

  // Ejecuta la actualización
  sensorModel.findOneAndUpdate(
    {sensor_id},
    {$push: {data: dataNew}})
    .then(documentUpdated => {
      return res.send( documentUpdated );
    })
    .catch(err => {
      console.error('Error al insertar el objeto en el array:', err);
      return res.status(404).send();

    });

});


export default sensorsRouter;
