<script setup>

</script>

<template>
    <div class="outline">
        <div class="header">大纲</div>

    </div>
</template>

<style scoped>
.outline {
    width: 250px;
    background: var(--left-background);
    border-right: 1px solid var(--theme-divider);
}

.header {
    height: 40px;
    display: flex;
    flex-direction: row;
    flex: 1;
    font-size: 14px;
    line-height: 40px;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    letter-spacing: 2px;
}

@media (prefers-color-scheme: dark) {
    .outline {
        border-right: 1px solid #000;
    }
}
</style>