import { Type } from '@sinclair/typebox';
import addErrors from 'ajv-errors';
import Ajv from 'ajv';


const LoginDTOSchema = Type.Object (
  {
    user: Type.String({
      errorMessage: {
        type: "El tipo del usuario no es valido",
      },
    }),
    password: Type.String({
      errorMessage: {
        type: "El tipo de la contraseña no es valido",
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

const validate = ajv.compile( LoginDTOSchema );

const validateLoginDTO = ( req, res, next ) => {

  const isDTOValid = validate( req.body );

  if ( !isDTOValid )
    return res
      .status(400)
      .send(ajv.errorsText( validate.errors, { separator: "\n" } ));

  next();

}

export default validateLoginDTO;
