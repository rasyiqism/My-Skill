import { ref } from 'vue';

export type ToastType = 'info' | 'success' | 'warning' | 'error';

export interface ToastUndoAction {
  label?: string;
  action: () => void | Promise<void>;
}

export interface ToastItem {
  id: string;
  type: ToastType;
  message: string;
  duration?: number;
  undo?: ToastUndoAction;
  timerId?: ReturnType<typeof setTimeout>;
}

export interface ToastOptions {
  type?: ToastType;
  duration?: number;
  undo?: ToastUndoAction;
}

const toasts = ref<ToastItem[]>([]);

export function useToast() {
  function dismiss(id: string) {
    const index = toasts.value.findIndex(t => t.id === id);
    if (index !== -1) {
      if (toasts.value[index].timerId) {
        clearTimeout(toasts.value[index].timerId);
      }
      toasts.value.splice(index, 1);
    }
  }

  function show(message: string, options: ToastOptions = {}) {
    const id = `toast_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
    const duration = options.duration ?? 5000;

    const item: ToastItem = {
      id,
      type: options.type ?? 'info',
      message,
      duration,
      undo: options.undo
    };

    if (duration > 0) {
      item.timerId = setTimeout(() => {
        dismiss(id);
      }, duration);
    }

    // Keep max 5 visible toasts to avoid viewport clutter
    if (toasts.value.length >= 5) {
      const oldest = toasts.value.shift();
      if (oldest?.timerId) clearTimeout(oldest.timerId);
    }

    toasts.value.push(item);
    return id;
  }

  async function triggerUndo(id: string) {
    const item = toasts.value.find(t => t.id === id);
    if (item?.undo) {
      try {
        await item.undo.action();
      } finally {
        dismiss(id);
      }
    }
  }

  return {
    toasts,
    show,
    dismiss,
    triggerUndo,
    success: (msg: string, opts?: Omit<ToastOptions, 'type'>) => show(msg, { ...opts, type: 'success' }),
    error: (msg: string, opts?: Omit<ToastOptions, 'type'>) => show(msg, { ...opts, type: 'error' }),
    info: (msg: string, opts?: Omit<ToastOptions, 'type'>) => show(msg, { ...opts, type: 'info' }),
    warning: (msg: string, opts?: Omit<ToastOptions, 'type'>) => show(msg, { ...opts, type: 'warning' })
  };
}
