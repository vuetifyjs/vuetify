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

    // TODO: prepend & append props
    const hasPrepend = !!slots.prepend;
    const hasAppend = !!slots.append;

    useRender(() => {
      return (
        <Tag>
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
                    <VAvatar key="prepend-avatar" icon={props.prependAvatar} />
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
