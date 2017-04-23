import {configureStore as devStore} from './configureStore.dev';
import {configureStore as prodStore} from './configureStore.prod';

export function configureStore(history) {
    if (process.env.NODE_ENV === 'production') {
        return prodStore(history);
    } else {
        return devStore(history);
    }
}