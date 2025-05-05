import "./VNavigationItem.sass";

import {
  VAvatar,
  VDefaultsProvider,
  VIcon,
  VListItemSubtitle,
  VListItemTitle,
} from "@/components";
import { makeBorderProps } from "@/composables/border";
import { makeComponentProps } from "@/composables/component";
import { makeDensityProps } from "@/composables/density";
import { genericComponent, propsFactory, useRender } from "@/util";
import { toDisplayString } from "vue";

export type VNavigationItemSlots = {
  prepend: never;
  append: never;
  default: never;
  title: never;
  subtitle: never;
};

export const makeVNavigationItemProps = propsFactory(
  {
    active: {
      type: Boolean,
      default: undefined,
    },
    subtitle: {
      type: [String, Number, Boolean],
      default: undefined,
    },
    title: {
      type: [String, Number, Boolean],
      default: undefined,
    },

    // prepend props
    prependAvatar: String,
    prependIcon: String,

    // append props
    appendAvatar: String,
    appendIcon: String,

    // rail
    railWidth: Number,

    ...makeBorderProps(),
    ...makeComponentProps(),
    ...makeDensityProps(),
  },
  "VNavigationItem"
);

export const VNavigationItem = genericComponent<VNavigationItemSlots>()({
  name: "VNavigationItem",
  props: makeVNavigationItemProps(),
  setup(props, { slots }) {
    const Tag = "a";

    // Determine if applicable slots are provided
    // or attributing props
    const hasTitle = slots.title || props.title != null;
    const hasSubtitle = slots.subtitle || props.subtitle != null;

    // prepend
    const hasPrependMedia = !!(props.prependAvatar || props.prependIcon);
    const hasPrepend = !!(hasPrependMedia || slots.prepend);

    // append
    const hasAppendMedia = !!(props.appendAvatar || props.appendIcon);
    const hasAppend = !!(hasAppendMedia || slots.append);

    useRender(() => {
      return (
        <Tag class={["v-navigation-item"]}>
          {/* prepend */}
          {/*
           * TODO: Be able to detect rail from VNavigationDrawer parent.
           * If prepend should have the width of railWidth
           */}
          {hasPrepend && (
            <div key="prepend" class="v-navigation-item__prepend">
              {!slots.prepend ? (
                <>
                  {props.prependIcon && (
                    <VIcon key="prepend-icon" icon={props.prependIcon} />
                  )}

                  {props.prependAvatar && (
                    <VAvatar key="prepend-avatar" image={props.prependAvatar} />
                  )}
                </>
              ) : (
                <VDefaultsProvider key="prepend-defaults">
                  {slots.prepend?.()}
                </VDefaultsProvider>
              )}
            </div>
          )}
          {/* default */}
          <div class="v-navigation-item__content">
            {hasTitle && (
              <VListItemTitle key="title">
                {slots.title?.() ?? toDisplayString(props.title)}
              </VListItemTitle>
            )}
            {hasSubtitle && (
              <VListItemSubtitle key="subtitle">
                {slots.subtitle?.() ?? toDisplayString(props.subtitle)}
              </VListItemSubtitle>
            )}
            {slots.default?.()} {props.railWidth}
          </div>
          {/* append */}
          {hasAppend && (
            <div key="append" class="v-navigation-item__append">
              {!slots.append ? (
                <>
                  {props.appendIcon && (
                    <VIcon key="append-icon" icon={props.appendIcon} />
                  )}

                  {props.appendAvatar && (
                    <VAvatar key="append-avatar" icon={props.appendAvatar} />
                  )}
                </>
              ) : (
                <VDefaultsProvider
                  key="append-defaults"
                  defaults={{
                    VAvatar: {
                      image: props.appendAvatar,
                    },
                    VIcon: {
                      icon: props.appendIcon,
                    },
                  }}
                >
                  {slots.append?.()}
                </VDefaultsProvider>
              )}
            </div>
          )}
        </Tag>
      );
    });
  },
});
export type VNavigationItem = InstanceType<typeof VNavigationItem>;
