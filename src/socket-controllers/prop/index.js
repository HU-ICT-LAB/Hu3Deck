import makeListPropById from './list-prop-by-id';

import { getPropById } from '../../use-cases/prop-use-cases';

const listPropById = makeListPropById({ getPropById });



export default { listPropById };
export { listPropById };