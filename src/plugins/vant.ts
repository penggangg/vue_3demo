import {
    Toast
    // Loading,
    // Button
} from 'vant';
import { createApp } from 'vue';

export default function loadComponent(app: ReturnType<typeof createApp>): void {
    app.use(Toast);
    // app.use(Loading);
    // app.use(Button);
}
