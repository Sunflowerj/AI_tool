<template>
  <div class="note-editor-wrapper">
    <div v-if="currentNote" class="editor-main-layout">
      <div class="header-action">
        <el-button
        v-if="editorStore.isEditMode"
          type="primary"
          :icon="MagicStick"
          round
          @click="handleAIProcess"
          >AI润色</el-button
        >
        <el-dialog
          v-model="aiDialogVisible"
          title="AI智能优化"
          width="500px"
          :close-on-click-modal="false"
        >
          <div class="ai-content-box">
            <pre class="streaming-text">{{ aiResult }}</pre>
            <span v-if="isStreaming" class="typing-cursor">|</span>
          </div>
          <template #footer>
            <div class="dialog-footer">
              <el-button @click="handleDiscart">丢弃</el-button>
              <el-button @click="handleAccept" type="primary"
                >接受并替换</el-button
              >
            </div>
          </template>
        </el-dialog>
      </div>
      <transition name="el-zoom-in-top">
        <div v-show="editorStore.isEditMode" class="toolbar-sticky-box">
          <Toolbar
            :editor="editorRef"
            :defaultConfig="toolbarConfig"
            mode="default"
          />
        </div>
      </transition>

      <div class="paper-container">
        <div class="title-wrapper">
          <input
            v-model="currentNote.title"
            class="note-title-input"
            placeholder="无标题"
            :readonly="!editorStore.isEditMode"
          />
          <div class="right-info">
            <span class="meta-info"
              >最后更新: {{ formatTime(currentNote.updatedAt) }}</span
            >
          </div>
        </div>

        <div v-show="editorStore.isEditMode" class="editor-body">
          <Editor
            v-model="html"
            :defaultConfig="editorConfig"
            mode="default"
            @onCreated="handleCreated"
          />
        </div>
      </div>
    </div>

    <el-empty v-else description="请选择一篇笔记开始阅读" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, shallowRef, onBeforeUnmount, watch } from "vue";
import { useNoteStore } from "@/stores/note";
import { useEditorStore } from "@/stores/editor";
import { Toolbar, Editor } from "@wangeditor/editor-for-vue";
import "@wangeditor/editor/dist/css/style.css";
import dayjs from "dayjs";
import { MagicStick } from "@element-plus/icons-vue";

const noteStore = useNoteStore();
const editorStore = useEditorStore();

const editorRef = shallowRef();
const html = ref(""); // 编辑器内容

const aiDialogVisible = ref(false);
const isStreaming = ref(false);
const aiResult = ref("");

//AI相关逻辑
const lastSelection = ref<{ text: string; isFull: boolean } | null>(null); // 记录上一次选中的文本及是否全选

const handleAIProcess = () => {
  const editor = editorRef.value;
  if (!editor) return;

  const selectionText = editor.getSelectionText(); // 获取当前选中文本

  if (selectionText) {
    lastSelection.value = { text: selectionText, isFull: false };
  } else {
    lastSelection.value = { text: editor.getText(), isFull: true };
  }

  aiDialogVisible.value = true;
  aiResult.value = "";
  isStreaming.value = true;

  const mockResponse = "这是AI生成的内容示例。";
  let i = 0;
  const timer = setInterval(() => {
    aiResult.value += mockResponse[i++];
    if (i > mockResponse.length) {
      clearInterval(timer);
      isStreaming.value = false;
    }
  }, 30);
};

const handleAccept = () => {
  const editor = editorRef.value;
  if (!editor || !lastSelection.value) return; 
  if (lastSelection.value.isFull) {
    html.value = `<p>${aiResult.value.replace(/\n/g, "<p></p>")}</p>`; // 全文替换
  } else {
    editor.insertText(aiResult.value);
  }
  aiDialogVisible.value = false;
  lastSelection.value = null;
};

const handleDiscart = () => {
  aiDialogVisible.value = false;
  lastSelection.value = null;
};

// --- wangEditor 配置 ---
const toolbarConfig = {
  excludeKeys: ["fullScreen"], // 排除掉不需要的菜单
};

const editorConfig = {
  placeholder: "在此输入笔记内容...",
  autoFocus: false, // 自动聚焦关闭，避免切换笔记时光标跳动
  hoverbarKeys: {
    text: {
      menuKeys: [],
    },
  },
};

// --- 逻辑处理 ---

// 1. 核心：监听笔记切换，同步更新编辑器
watch(
  () => noteStore.currentNoteId,
  (newId) => {
    const note = noteStore.notes.find((n) => n.id === newId);
    const content = note?.content || "";
    html.value = content;
    if (editorRef.value) {
      editorRef.value.setHtml(content);
    }
  },
  { immediate: true },
);

watch(html, (newHtml) => {
  if (currentNote.value) {
    currentNote.value.content = newHtml;
    currentNote.value.updatedAt = Date.now();
  }
});

const handleCreated = (editor: any) => {
  editorRef.value = editor;
};

const currentNote = computed(() =>
  noteStore.notes.find((n) => n.id === noteStore.currentNoteId),
);
const formatTime = (ts: number) => dayjs(ts).format("YYYY-MM-DD HH:mm");

onBeforeUnmount(() => {
  if (editorRef.value) editorRef.value.destroy();
});
</script>

<style scoped>
.note-editor-wrapper {
  height: 100%;
  background-color: #f5f7f9; /* 浅灰底色，衬托纸张感 */
}

.editor-main-layout {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.toolbar-sticky-box {
  background: #fff;
  border-bottom: 1px solid #e8e8e8;
  z-index: 10;
}

.paper-container {
  /* max-width: 900px; */
  width: 100%;
  /* margin: 0 auto; */
  background: #fff;
  min-height: 1000px;
  padding: 60px 80px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  /* 纸张的阴影 */
}

.title-wrapper {
  margin-bottom: 30px;
}

.note-title-input {
  width: 100%;
  border: none;
  outline: none;
  font-size: 36px;
  font-weight: 700;
  color: #262626;
  border-bottom: 2px solid transparent;
  transition: all 0.3s;
}

.note-title-input:focus {
  border-bottom-color: #cdd2d7;
}

:deep(.w-e-text-container) {
  border: none !important;
  background-color: transparent !important;
}

:deep(.w-e-toolbar) {
  border: none !important;
}

.meta-info {
  font-size: 12px;
  color: #999;
  margin-right: 15px;
}

.ai-content-box {
  background-color: #f8f9fa;
  padding: 15px;
  border-radius: 8px;
  min-height: 150px;
  max-height: 400px;
  overflow-y: auto;
  font-family: monospace;
}

.streaming-text {
  /* 保留空格和换行 */
  white-space: pre-wrap;
  /* 长词换行 */
  word-break: break-word;
  margin: 0;
  /* 1.5倍字体大小 */
  line-height: 1.6;
}

.typing-cursor {
  display: inline-block;
  width: 2px;
  height: 15px;
  background: #409eff;
  margin-left: 2px;
  animation: blink 0.8s infinite;
}

@keyframes blink {
  50% {
    opacity: 0;
  }
}
</style>
