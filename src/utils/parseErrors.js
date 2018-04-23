/**
 * Created by user on 4/20/18.
 */
import _ from 'lodash';

export default function (errors) {

    const result = {};
    _.forEach(errors, (val, key) => {
       result[key] = val.message;
    });

    return result;
}