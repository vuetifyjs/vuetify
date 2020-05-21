import type { VNodeProps } from 'vue';
export declare type PublicComponent<T> = {
    $props: VNodeProps & T;
};
export declare const publicComponent: <Props>(component: unknown) => PublicComponent<Props>;
