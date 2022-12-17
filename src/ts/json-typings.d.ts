import { Products } from './types';

declare module '*.json' {
    const value: Products[];
    export default value;
}
