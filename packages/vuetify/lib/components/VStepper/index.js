import { createSimpleFunctional } from '../../util/helpers';
import VStepper from './VStepper';
import VStepperStep from './VStepperStep';
import VStepperContent from './VStepperContent';
var VStepperHeader = createSimpleFunctional('v-stepper__header');
var VStepperItems = createSimpleFunctional('v-stepper__items');
export { VStepper, VStepperContent, VStepperStep, VStepperHeader, VStepperItems };
export default {
    $_vuetify_subcomponents: {
        VStepper: VStepper,
        VStepperContent: VStepperContent,
        VStepperStep: VStepperStep,
        VStepperHeader: VStepperHeader,
        VStepperItems: VStepperItems
    }
};
//# sourceMappingURL=index.js.map