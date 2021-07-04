import {ErrorFieldValidation, ValidationResult} from '../../types/server';
import {VALIDATION_ERRORS} from '../../constants';
import {Author} from '../../types/models';
import AuthorModel from '../../models/author';

const validateParams = (author: any): Promise<ValidationResult> => {
    return new Promise<ValidationResult>((resolve, reject) => {
        const validateAuthorInputParams = (author: any): ErrorFieldValidation[] | null => {
            const errors = [];
            if (!author) {
                errors.push ({ field: '', reason: VALIDATION_ERRORS.EMPTY_INPUT});
                return  errors;
            }
            if (!author.id) { errors.push ({ field: 'id', reason: VALIDATION_ERRORS.EMPTY_FIELD }); }
            if (typeof author.id !== 'number') { errors.push ({ field: 'id', reason: VALIDATION_ERRORS.INVALID_FIELD }); }
            if (!author.name) { errors.push ({ field: 'name', reason: VALIDATION_ERRORS.EMPTY_FIELD }); }
            if (typeof author.name !== 'string') { errors.push ({ field: 'id', reason: VALIDATION_ERRORS.INVALID_FIELD }); }

            return errors.length ? errors : null;
        }

        const validationResults = validateAuthorInputParams(author);

        if (validationResults) {
            reject({ data: author, statusCode: 400, errors: validationResults })
        } else {
            resolve({ data: author, statusCode: 200, errors: null });
        }
    });
};

const isExist = (author: Author): Promise<ValidationResult> => {
  return AuthorModel.findOne({ id: author.id })
      .then(
          (author: Author) => {
              if (!author) return { data: author, statusCode: 200, errors: null };
              return { data: author, statusCode: 409, errors: [{ field: '', reason: VALIDATION_ERRORS.EXISTS }]};
          }
      )
      .catch((e: Error) => ({ data: author, statusCode: 500, errors: [{ field: '', reason: e.message }] }));
};

export default {
    validateParams,
    isExist
};
