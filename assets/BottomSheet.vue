<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import AppIcon from './AppIcon.vue';

interface Props {
  modelValue: boolean;
  title?: string;
  maxHeight?: string;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  title: '',
  maxHeight: 'max-h-[85vh]'
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
  (e: 'close'): void;
}>();

const startY = ref(0);
const currentY = ref(0);
const isDragging = ref(false);

function close() {
  emit('update:modelValue', false);
  emit('close');
}

function onTouchStart(e: TouchEvent) {
  startY.value = e.touches[0].clientY;
  isDragging.value = true;
}

function onTouchMove(e: TouchEvent) {
  if (!isDragging.value) return;
  const delta = e.touches[0].clientY - startY.value;
  // Only allow downward drag
  if (delta > 0) {
    currentY.value = delta;
  }
}

function onTouchEnd() {
  if (!isDragging.value) return;
  isDragging.value = false;
  // If dragged down more than 100px, dismiss; otherwise snap back
  if (currentY.value > 100) {
    close();
  }
  currentY.value = 0;
}

function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' && props.modelValue) {
    close();
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown);
});

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown);
});
</script>

<template>
  <Teleport to="body">
    <!-- Backdrop Overlay -->
    <Transition
      enter-active-class="transition-opacity duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="modelValue"
        @click="close"
        class="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs transition-opacity"
        aria-hidden="true"
      />
    </Transition>

    <!-- Bottom Sheet Container -->
    <Transition
      enter-active-class="transition-transform duration-250 ease-out"
      enter-from-class="translate-y-full"
      enter-to-class="translate-y-0"
      leave-active-class="transition-transform duration-200 ease-in"
      leave-from-class="translate-y-0"
      leave-to-class="translate-y-full"
    >
      <div
        v-if="modelValue"
        role="dialog"
        aria-modal="true"
        :aria-label="title || 'Sheet'"
        :class="[
          'fixed bottom-0 inset-x-0 z-50 flex flex-col w-full bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800 rounded-t-2xl shadow-2xl overflow-hidden',
          'sm:max-w-lg sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 sm:rounded-2xl sm:bottom-6 sm:border',
          maxHeight
        ]"
        :style="{ transform: currentY > 0 ? `translateY(${currentY}px)` : undefined }"
      >
        <!-- Drag Handle Area (Mobile Ergonomics) -->
        <div
          @touchstart="onTouchStart"
          @touchmove="onTouchMove"
          @touchend="onTouchEnd"
          class="pt-3 pb-2 cursor-grab active:cursor-grabbing touch-none select-none flex flex-col items-center justify-center shrink-0"
        >
          <div class="w-10 h-1.5 rounded-full bg-neutral-300 dark:bg-neutral-700" />
        </div>

        <!-- Sheet Header -->
        <div v-if="title || $slots.header" class="flex items-center justify-between px-5 pb-3 border-b border-neutral-100 dark:border-neutral-800 shrink-0">
          <slot name="header">
            <h2 class="text-base font-semibold text-neutral-900 dark:text-neutral-100 tracking-tight">
              {{ title }}
            </h2>
          </slot>
          <button
            type="button"
            @click="close"
            class="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 active:scale-90 transition-all cursor-pointer"
            aria-label="Tutup"
          >
            <AppIcon name="x" size="18" />
          </button>
        </div>

        <!-- Sheet Body (Scrollable) -->
        <div class="flex-1 overflow-y-auto px-5 py-4 overscroll-contain">
          <slot />
        </div>

        <!-- Optional Footer / Action Bar (60% Thumb Zone) -->
        <div v-if="$slots.footer" class="p-4 border-t border-neutral-100 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/60 shrink-0">
          <slot name="footer" />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
