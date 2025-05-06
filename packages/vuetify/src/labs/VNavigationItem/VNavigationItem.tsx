import "./VNavigationItem.sass";

import {
  VAvatar,
  VDefaultsProvider,
  VIcon,
  VListItemSubtitle,
  VListItemTitle,
} from "@/components";
import { makeBorderProps, useBorder } from "@/composables/border";
import { makeComponentProps } from "@/composables/component";
import { makeDensityProps } from "@/composables/density";
import { makeThemeProps, provideTheme } from "@/composables/theme";
import { computed, toDisplayString } from "vue";

// Directives
import { Ripple } from "@/directives/ripple";

import {
  convertToUnit,
  genericComponent,
  propsFactory,
  useRender,
} from "@/util";

import type { RippleDirectiveBinding } from "@/directives/ripple";
import type { PropType } from "vue";
import { genOverlays } from "@/composables/variant";
import { useNestedItem } from "@/composables/nested/nested";

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

    ripple: {
      type: [Boolean, Object] as PropType<RippleDirectiveBinding["value"]>,
      default: true,
    },

    // rail
    railWidth: Number,

    value: null,

    ...makeBorderProps(),
    ...makeComponentProps(),
    ...makeThemeProps(),
    ...makeDensityProps(),
  },
  "VNavigationItem"
);

export const VNavigationItem = genericComponent<VNavigationItemSlots>()({
  name: "VNavigationItem",
  directives: { Ripple },
  props: makeVNavigationItemProps(),
  setup(props, { slots }) {
    const id = computed(() => props.value);

    // TODO: how to activate w/o a parent list. should we even?
    const { activate, isActivated, isSelected, root } = useNestedItem(
      id,
      false
    );

    const { themeClasses } = provideTheme(props);
    const { borderClasses } = useBorder(props);

    const isSelectable = computed(() => props.value != null);
    const isClickable = computed(() => isSelectable.value);
    const isActive = computed(() =>
      root.activatable.value ? isActivated.value : isSelected.value
    );

    function onClick(e: MouseEvent) {
      console.log(root.activatable.value);
      if (root.activatable.value) {
        activate(!isActivated.value, e);
      }
    }

    useRender(() => {
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

      return (
        <Tag
          class={[
            "v-navigation-item",
            {
              "v-navigation-item--link": isClickable.value,
            },
            themeClasses.value,
            borderClasses.value,
            props.class,
          ]}
          onClick={onClick}
          v-ripple={isClickable && props.ripple}
        >
          {genOverlays(isClickable.value, "v-navigation-item")}

          {hasPrepend && (
            <div
              key="prepend"
              class="v-navigation-item__prepend"
              style={{
                width: convertToUnit(props.railWidth),
              }}
            >
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
            {slots.default?.()} {isActive.value.toString()}
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
