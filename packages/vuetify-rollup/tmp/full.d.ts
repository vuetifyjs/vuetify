import { App } from 'vue';
import './styles/main.sass';
declare function install(app: App, options?: {}): void;
declare namespace install {
    var version: string;
}
export default install;
