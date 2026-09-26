<template>
  <div
    class="mw-markdown"
    :class="{ 'mw-markdown--compact': compact }"
    v-html="html"
  ></div>
</template>

<script setup>
import { computed } from 'vue';
import { renderChatMarkdown } from '../../utils/chatMarkdown';

const props = defineProps({
  content: { type: String, default: '' },
  compact: { type: Boolean, default: false },
});

const html = computed(() => renderChatMarkdown(props.content || ''));
</script>

<style scoped>
.mw-markdown {
  color: var(--text-primary, #111827);
  line-height: 1.7;
  font-size: 1.02rem;
  word-break: break-word;
}

.mw-markdown--compact {
  font-size: 0.92rem;
  line-height: 1.65;
}

.mw-markdown--compact :deep(h1) { font-size: 1.15rem !important; margin: 0.75rem 0 0.4rem !important; line-height: 1.35 !important; }
.mw-markdown--compact :deep(h2) { font-size: 1.05rem !important; margin: 0.65rem 0 0.35rem !important; line-height: 1.35 !important; }
.mw-markdown--compact :deep(h3) { font-size: 0.95rem !important; margin: 0.55rem 0 0.25rem !important; line-height: 1.35 !important; }
.mw-markdown--compact :deep(h4) { font-size: 0.88rem !important; margin: 0.45rem 0 0.2rem !important; line-height: 1.35 !important; }
.mw-markdown--compact :deep(p) { margin: 0.35rem 0 !important; line-height: 1.58 !important; }
.mw-markdown--compact :deep(pre) { margin: 0.5rem 0 !important; padding: 0.6rem 0.8rem !important; font-size: 0.8em !important; }
.mw-markdown--compact :deep(ul),
.mw-markdown--compact :deep(ol) { margin: 0.35rem 0 0.5rem 1.2rem !important; }

.mw-markdown :deep(h1),
.mw-markdown :deep(h2),
.mw-markdown :deep(h3),
.mw-markdown :deep(h4) {
  color: var(--text-primary, #111827);
  font-weight: 700;
  line-height: 1.3;
  margin: 1.15em 0 0.55em;
}

.mw-markdown :deep(h1) { font-size: 1.7rem; }
.mw-markdown :deep(h2) { font-size: 1.4rem; }
.mw-markdown :deep(h3) { font-size: 1.2rem; }
.mw-markdown :deep(h4) { font-size: 1.05rem; }

.mw-markdown :deep(p) {
  margin: 0.65em 0;
  color: var(--text-primary, #111827);
}

.mw-markdown :deep(ul),
.mw-markdown :deep(ol) {
  margin: 0.6em 0 0.8em 1.35em;
}

.mw-markdown :deep(li) {
  margin: 0.25em 0;
}

.mw-markdown :deep(blockquote) {
  margin: 0.8em 0;
  padding: 0.55em 0.85em;
  border-left: 3px solid var(--divider-strong, #d1d5db);
  color: var(--text-secondary, #4b5563);
  background: color-mix(in srgb, var(--bg-surface-2, #f3f4f6) 70%, transparent);
  border-radius: 0.35rem;
}

.mw-markdown :deep(code) {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;
  font-size: 0.88em;
  background: color-mix(in srgb, var(--bg-surface-2, #f3f4f6) 75%, transparent);
  padding: 0.12em 0.35em;
  border-radius: 0.35rem;
}

.mw-markdown :deep(pre) {
  margin: 0.9em 0;
  padding: 0.8em 0.95em;
  border-radius: 0.55rem;
  overflow-x: auto;
  background: color-mix(in srgb, var(--bg-surface-2, #f3f4f6) 85%, transparent);
  border: 1px solid var(--border, #e5e7eb);
}

.mw-markdown :deep(pre code) {
  background: transparent;
  padding: 0;
  border-radius: 0;
}

.mw-markdown :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin: 0.9em 0;
  display: block;
  overflow-x: auto;
}

.mw-markdown :deep(th),
.mw-markdown :deep(td) {
  border: 1px solid var(--border, #e5e7eb);
  padding: 0.5em 0.65em;
  text-align: left;
}

.mw-markdown :deep(th) {
  background: color-mix(in srgb, var(--bg-surface-2, #f3f4f6) 75%, transparent);
  font-weight: 600;
}

.mw-markdown :deep(a) {
  color: var(--primary, #111827);
  text-decoration: underline;
  text-underline-offset: 2px;
}

.mw-markdown :deep(hr) {
  border: none;
  border-top: 1px solid var(--divider-strong, #d1d5db);
  margin: 1.1em 0;
}
</style>
