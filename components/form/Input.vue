<template>
    <input
        v-bind="$attrs"
        v-model="localValue"
        :type="type"
        :id="id"
        :placeholder="placeholder"
        :required="required"
        class="p-3 mt-1 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
</template>

<script setup>
import { ref, watch } from 'vue';
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
    modelValue: {
        type: [String, Number],
        default: ''
    },
    id: {
        type: String,
        required: true
    },
    type: {
        type: String,
        default: 'text'
    },
    placeholder: {
        type: String,
        default: ''
    },
    required: {
        type: Boolean,
        default: false
    }
});

const emit = defineEmits(['update:modelValue']);

const localValue = ref(props.modelValue);

watch(
    () => props.modelValue,
    (newValue) => {
        localValue.value = newValue;
    }
);

watch(localValue, (newValue) => {
    emit('update:modelValue', newValue);
});
</script>
