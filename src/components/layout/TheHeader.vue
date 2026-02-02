<template>
    <header class="the-header">
        <div class="left">
            <el-button link @click="notesStore.toggleSidebar()">
                <el-icon :size="20">
                    <component :is="notesStore.isSidebarOpen? 'Fold' : 'Expand'"></component>
                </el-icon>
            </el-button>
            <span class="titile">AI笔记应用</span>
        </div>
        <div class="right">
            <el-button v-if="!editorStore.isEditMode" type="primary" size="small" plain @click="handleEdit">编辑</el-button>
            <el-button type="plain" size="small" plain @click="openSettings">设置</el-button>
        </div>
    </header>
</template>

<script lang="ts" setup>
    import {useNoteStore} from '@/stores/note';
    import { useEditorStore } from '@/stores/editor';
    import { computed } from 'vue';
    
    const notesStore = useNoteStore();
    const editorStore = useEditorStore();
    const currentNote = computed(()=>{
        return notesStore.currentNote;
    });

    const openSettings = () => {
        console.log('Open AI Settings');
    };

    const handleEdit = () => {
        editorStore.toggleEditMode(true);
    };

</script>


<style scoped>
    .the-header{
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 15px;
        background-color: #ffffff;
        border-bottom: 1px solid #f0f0f0;
    }
    .left{
        display: flex;
        align-items: center;
        gap:10px;
        /* 按钮和标题之间的间距 */
    }
    .title{
        font-size: bold;
    }
</style>