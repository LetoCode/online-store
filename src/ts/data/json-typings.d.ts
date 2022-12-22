import { Products } from '../types/types';

declare module '*.json' {
    const value: Products[];
    export default value;
}
