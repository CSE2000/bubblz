<template>
  <button
    :class="[
      'inline-flex items-center justify-center font-medium focus:outline-none transition',
      sizeClasses,
      colorClasses,
      rounded ? 'rounded-full' : 'rounded-md',
      fullWidth ? 'w-full' : ''
    ]"
    @click="onClick"
  >
    <slot>{{ text }}</slot>
  </button>
</template>

<script setup>
defineProps({
  text: {
    type: String,
    default: 'Button',
  },
  color: {
    type: String,
    default: 'primary', 
  },
  size: {
    type: String,
    default: 'md',
  },
  rounded: {
    type: Boolean,
    default: false,
  },
  fullWidth: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['click'])

const onClick = (e) => {
  emit('click', e)
}

// Dynamic classes
const sizeClassesMap = {
  sm: 'text-sm px-3 py-1.5',
  md: 'text-sm px-4 py-2',
  lg: 'text-base px-6 py-3',
}

const colorClassesMap = {
  primary: 'bg-[#2076E2] text-white hover:bg-[#1e67c2]',
  secondary: 'bg-gray-100 text-gray-700 hover:bg-gray-200',
  danger: 'bg-red-500 text-white hover:bg-red-600',
  custom: '', // in case you use fully custom classes via slot
}

const sizeClasses = computed(() => sizeClassesMap[size] || sizeClassesMap.md)
const colorClasses = computed(() => colorClassesMap[color] || color)
</script>
