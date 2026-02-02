<template>
  <div class="the-sidebar">
    <div class="header" v-if="store.isSidebarOpen">
      <el-button
        type="primary"
        size="small"
        class="w-full"
        @click="store.createNewNote"
      >
        <el-icon><Plus /></el-icon>
        <span>新建笔记</span>
      </el-button>
    </div>

    <el-menu
      :collapse="!store.isSidebarOpen"
      class="border-none"
      :default-active="store.currentNoteId"
    >
      <el-sub-menu index="created-group">
        <template #title>
          <el-icon><Location /></el-icon>
          <span>我创建的</span>
        </template>
        <el-menu-item
          v-for="note in store.createdNotes"
          :key="note.id"
          :index="note.id"
          @click="store.selectNote(note.id)"
          class="note-item"
        >
          <div class="note-item-content">
            <div class="title-box">
              <el-icon><Document /></el-icon>
              <span class="truncate">{{ note.title }}</span>
            </div>
            <el-dropdown
              trigger="click"
              @click.stop
              @command="(cmd) => handleCommand(cmd, note)"
            >
              <span class="more-icon" @click.stop>
                <el-icon><MoreFilled /></el-icon>
              </span>
              <template #dropdown>
                <el-dropdown-item command="rename">重命名</el-dropdown-item>
                <el-dropdown-item
                  command="delete"
                  divided
                  style="color: #f56c6c"
                  >删除</el-dropdown-item
                >
              </template>
            </el-dropdown>
          </div>
        </el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="joined-group">
        <template #title>
          <el-icon><Link /></el-icon>
          <span>我加入的</span>
        </template>
        <el-menu-item
          v-for="note in store.joinedNotes"
          :key="note.id"
          :index="note.id"
          @click="store.selectNote(note.id)"
        >
          <el-icon><Document /></el-icon>
          <span>{{ note.title }}</span>
        </el-menu-item>
      </el-sub-menu>
    </el-menu>
  </div>
</template>

<script lang="ts" setup>
import { useNoteStore } from "@/stores/note";
import { ElMessageBox, ElMessage } from "element-plus";

const handleCommand = (command: string | number | object, note: any) => {
  if (command === "delete") {
    confirmDelete(note);
  } else if (command === "rename") {
    handleRename(note);
  }
};

const confirmDelete = (note: any) => {
  ElMessageBox.confirm(`你确定要删除这篇笔记吗`, {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      store.deleteNote(note.id);
      ElMessage.success("删除成功");
    })
    .catch(() => {});
};

const handleRename = (note: any) => {
  console.log("修改标题");
};

const store = useNoteStore();
</script>

<style scoped>
.the-sidebar {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.note-item-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}
.title-box {
  display: flex;
  align-items: center;
  overflow: hidden;
  flex: 1;
}
.truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-left: 5px;
}
.more-icon {
  padding: 0 5px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  color: #909399;
}
.more-icon:hover {
  background-color: #f2f6fc;
  color: #409eff;
}
.header {
  padding: 10px 15px;
}
.w-ful {
  width: 100%;
}
.border-none {
  border-right: none;
}
:deep(.el-menu-item) {
  padding-right: 10px !important;
}
</style>
