import { Type } from '@sinclair/typebox';
import addErrors from 'ajv-errors';
import Ajv from 'ajv';


const SensorsDTOSchema = Type.Object (
  {
    id: Type.Number({
      errorMessage: {
        type: "El tipo del id no es valido",
      },
    }),
  },
  {
    additionalProperties: false,
    errorMessage: {
      additionalProperties: "El formato del objeto no es valido",
    }
  }
);

const ajv = new Ajv({ allErrors: true });
addErrors( ajv );

const validate = ajv.compile( SensorsDTOSchema );

const validateSensorsDTO = ( req, res, next ) => {
  
  const isDTOValid = validate( req.body );

  if ( !isDTOValid )
    return res
      .status(400)
      .send(ajv.errorsText( validate.errors, { separator: "\n" } ));

  next();

}

export default validateSensorsDTO;
