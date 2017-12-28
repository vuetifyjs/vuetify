import "vuetify/src/util/helpers";
import {PluginFunction} from "vue";

declare class Vuetify {
  static install: PluginFunction<never>;
}

declare class VuetifyApplication {
  bar: number;
  bottom: number;
  left: number;
  right: number;
  top: number;
}

declare class VuetifyBreakpoint {
  height: number;
  lg: boolean;
  lgAndDown: boolean;
  lgAndUp: boolean;
  lgOnly: boolean;
  md: boolean;
  mdAndDown: boolean;
  mdAndUp: boolean;
  mdOnly: boolean;
  name: string;
  sm: boolean;
  smAndDown: boolean;
  smAndUp: boolean;
  smOnly: boolean;
  width: number;
  xl: boolean;
  xlOnly: boolean;
  xs: boolean;
  xsOnly: boolean;
}

declare class VuetifyTheme {
  primary: string;
  accent: string;
  secondary: string;
  info: string;
  warning: string;
  error: string;
  success: string;
}

declare class VuetifyObject {
  application: VuetifyApplication;
  breakpoint: VuetifyBreakpoint;
  dark: boolean;
  theme: VuetifyTheme;
  touchSupport: boolean;
}

declare module "vue/types/vue" {
  interface Vue {
    $vuetify: VuetifyObject;
  }
}

export default Vuetify;