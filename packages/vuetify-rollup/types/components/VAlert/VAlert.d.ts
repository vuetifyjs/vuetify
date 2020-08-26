import './VAlert.sass';
export declare const VAlert: {
    new (...args: any[]): {
        $: import("vue").ComponentInternalInstance;
        $data: {};
        $props: {} & {
            type?: string;
        } & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps;
        $attrs: Record<string, unknown>;
        $refs: Record<string, unknown>;
        $slots: Readonly<{
            [name: string]: import("vue").Slot;
        }>;
        $root: import("vue").ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, import("vue").ComponentOptionsBase<any, any, any, any, any, any, any, any, string>>;
        $parent: import("vue").ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, import("vue").ComponentOptionsBase<any, any, any, any, any, any, any, any, string>>;
        $emit: (event: string, ...args: any[]) => void;
        $el: any;
        $options: import("vue").ComponentOptionsBase<{} & {
            type?: string;
        }, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
            [key: string]: any;
        }>, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string>;
        $forceUpdate: import("vue").ReactiveEffect<any>;
        $nextTick: typeof import("vue").nextTick;
        $watch: (this: import("vue").ComponentInternalInstance, source: string | Function, cb: Function, options?: import("vue").WatchOptions<boolean>) => import("vue").WatchStopHandle;
    } & {} & {
        type?: string;
    } & import("vue").ShallowUnwrapRef<() => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }>> & {} & import("vue").ComponentCustomProperties & Readonly<{
        type: string;
    } & {}>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
} & import("vue").ComponentOptionsBase<Readonly<{
    type: string;
} & {}>, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string> & {
    props: {
        type: {
            type: StringConstructor;
            default: string;
        };
    } & ThisType<void>;
} & ThisType<import("vue").ComponentPublicInstance<Readonly<{
    type: string;
} & {}>, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>, {}, {}, {}, Record<string, any>, Readonly<{
    type: string;
} & {}>, import("vue").ComponentOptionsBase<Readonly<{
    type: string;
} & {}>, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string>>>;
