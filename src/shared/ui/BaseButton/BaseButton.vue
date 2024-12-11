<script setup lang="ts">
import { ElButton } from 'element-plus';
import { useTemplateRef, type VNode } from 'vue';

type ElementProps = InstanceType<typeof ElButton>['$props'];
type PickedProps = Pick<ElementProps, 'disabled' | 'type' | 'size' | 'icon' | 'link' | 'plain' | 'dark'>;
type Props = {
  type?: PickedProps['type'];
  disabled?: boolean;
  size?: PickedProps['size'];
  icon?: PickedProps['icon'];
  link?: PickedProps['link'];
  plain?: PickedProps['plain'];
  dark?: PickedProps['dark'];
};

type BaseButtonSlots = {
  default: () => VNode[];
  loading?: () => VNode[];
  icon?: () => VNode[];
};

defineSlots<BaseButtonSlots>();
const { type = 'default', size = 'default', disabled = false, icon, link } = defineProps<Props>();
const baseButtonRef = useTemplateRef('baseButtonRef');

defineExpose({
  baseButtonRef,
});
</script>
<template>
  <ElButton
    ref="baseButtonRef"
    :disabled="disabled"
    :type="type"
    :size="size"
    :icon="icon"
    :link="link"
    :plain="plain"
    :class="[classes.root, classes[type]]"
    :dark="dark"
    ><slot
  /></ElButton>
</template>
<style module="classes" lang="scss">
.root {
  border-radius: 2px;
}
.root + .root {
  margin-left: 0;
}
.default {
  border-color: #fff000;
}
</style>
