"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// 发布订阅
class PubSub {
    constructor() {
        // 订阅记录
        this.events = new Map();
        // 只订阅一次的记录
        this.onceEvents = new Map();
    }
    static getInstance() {
        if (!PubSub.instance) {
            PubSub.instance = new PubSub();
        }
        return PubSub.instance;
    }
    // 订阅
    on(event, callback) {
        if (!this.events.has(event)) {
            this.events.set(event, []);
        }
        this.events.get(event).push(callback);
    }
    // 取消订阅
    off(event, callback) {
        const listeners = this.events.get(event);
        if (listeners === null || listeners === void 0 ? void 0 : listeners.length) {
            listeners.splice(0, listeners.length, ...listeners.filter((fn) => fn !== callback));
        }
        const onceListeners = this.onceEvents.get(event);
        if (onceListeners === null || onceListeners === void 0 ? void 0 : onceListeners.length) {
            onceListeners.splice(0, onceListeners.length, ...onceListeners.filter((fn) => fn !== callback));
        }
    }
    // 只订阅一次
    once(event, callback) {
        if (!this.onceEvents.has(event)) {
            this.onceEvents.set(event, []);
        }
        this.onceEvents.get(event).push(callback);
    }
    // 发布
    emit(event, ...args) {
        Promise.resolve().then(() => {
            const listeners = this.events.get(event) || [];
            const onceListeners = this.onceEvents.get(event) || [];
            const allListeners = [...listeners, ...onceListeners];
            if (allListeners.length) {
                for (let i = 0, len = allListeners.length; i < len; i++) {
                    allListeners[i].apply(this, args);
                }
            }
            if (onceListeners.length) {
                onceListeners.splice(0);
            }
        });
    }
    // 清空订阅
    clear() {
        this.events.clear();
        this.onceEvents.clear();
    }
}
exports.default = PubSub;
PubSub.instance = null;
PubSub.getInstance().on('sdf', () => {
    return;
});
