/**
 * Created by user on 4/24/18.
 */
import { schema } from 'normalizr';

export const bookSchema = new schema.Entity(
    "books",
    {},
    { idAttribute: "_id" }
);