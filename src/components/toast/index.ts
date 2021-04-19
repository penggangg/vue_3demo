import { createApp } from 'vue';
import toast from './Toast.vue';
const el = document.createElement('div');
const instance: any = createApp(toast).mount(el);
document.body.appendChild(instance.$el);
const queue: any = [];
const callbacks = (text: string | number = '加载中', duration = 3000) => {
    return new Promise<void>(resolve => {
        instance.show(text, duration);
        setTimeout(async() => {
            if (queue.length) {
                await queue.shift()(text, duration);
            }
            resolve();
        }, duration);
    });
};
export default function zctToast(text: string | number = '加载中', duration = 3000) {
    if (!instance.showWrap) {
        if (!queue.length) {
            callbacks(text, duration);
        }
    } else {
        queue.push(() => {
            callbacks(text, duration);
        });
    }
}
