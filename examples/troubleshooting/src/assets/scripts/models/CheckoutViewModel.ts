import BaseModel from '../../../../../../ts/model/BaseModel';
import InputModel from './form/InputModel';

/**
 * @class CheckoutViewModel
 * @extends ApiBaseModel
 * @constructor
 **/
class CheckoutViewModel extends BaseModel {

    /**
     * @property pickHowOptions
     * @type {Array<{}>}
     * @public
     */
    pickHowOptions = [
        new InputModel({
            id: 'one',
        }),
        new InputModel({
            id: 'two',
        }),
    ];

    test = InputModel;
    testArray = [InputModel];

    constructor(data={}, opts = {}) {
        super(opts);

        if (data) {
            this.update(data);
        }
    }

    /**
     * @overridden ApiBaseModel.update
     */
    update(data) {
        super.update(data);

        // Override any values after the default super update method has set the values.
    }

}

export default CheckoutViewModel;
