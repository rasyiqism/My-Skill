<script setup lang="ts">
import { useToast } from './useToast';
import AppIcon from './AppIcon.vue';

const { toasts, dismiss, triggerUndo } = useToast();

const typeIcons: Record<string, string> = {
  success: 'check',
  error: 'x',
  warning: 'alert-triangle',
  info: 'info'
};

const typeAccentClasses: Record<string, string> = {
  success: 'border-l-4 border-l-emerald-500 text-emerald-400',
  error: 'border-l-4 border-l-rose-500 text-rose-400',
  warning: 'border-l-4 border-l-amber-500 text-amber-400',
  info: 'border-l-4 border-l-indigo-500 text-indigo-400'
};
</script>

<template>
  <div
    role="region"
    aria-label="Notifications"
    class="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full px-4 sm:px-0 pointer-events-none"
  >
    <TransitionGroup
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="transform translate-y-3 opacity-0 scale-95"
      enter-to-class="transform translate-y-0 opacity-100 scale-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-for="toast in toasts"
        :key="toast.id"
        class="pointer-events-auto flex items-center justify-between gap-3 p-3.5 rounded-lg bg-neutral-900/95 dark:bg-neutral-900/95 text-neutral-100 shadow-xl border border-neutral-800 backdrop-blur-md transition-all duration-150 hover:border-neutral-700"
        :class="typeAccentClasses[toast.type]"
      >
        <div class="flex items-center gap-2.5 min-w-0 flex-1">
          <AppIcon
            :name="typeIcons[toast.type] || 'info'"
            size="18"
            class="shrink-0"
          />
          <p class="text-sm font-medium leading-snug truncate">
            {{ toast.message }}
          </p>
        </div>

        <div class="flex items-center gap-2 shrink-0">
          <!-- Undo Button (Instant Execution Pattern) -->
          <button
            v-if="toast.undo"
            type="button"
            @click="triggerUndo(toast.id)"
            class="px-2.5 py-1 text-xs font-semibold rounded bg-neutral-800 hover:bg-neutral-700 active:scale-95 text-amber-300 hover:text-amber-200 border border-neutral-700 transition-all duration-100 cursor-pointer"
          >
            {{ toast.undo.label || 'Undo' }}
          </button>

          <!-- Dismiss Button -->
          <button
            type="button"
            @click="dismiss(toast.id)"
            class="p-1 rounded text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800 active:scale-90 transition-all cursor-pointer"
            aria-label="Tutup"
          >
            <AppIcon name="x" size="14" />
          </button>
        </div>
      </div>
    </TransitionGroup>
  </div>
</template>
