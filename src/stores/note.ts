import {defineStore} from 'pinia';

import {ref, computed, watch} from 'vue';

export interface Note{
    id: string;
    title: string;
    content: string;
    createdAt: number;
    updatedAt: number;
    type?: 'created' | 'joined'; // 笔记类型：我创建的 或 我加入的
}

export const useNoteStore = defineStore('note', ()=>{
    const notes = ref(JSON.parse(localStorage.getItem('my_notes') || '[]'));
    const currentNoteId = ref('')

    let timer: number | null = null;

    //添加一个防抖函数，防止频繁写入localStorage
    watch(notes,(newNote)=>{
        if(timer) clearTimeout(timer);
        timer = window.setTimeout(()=>{
        localStorage.setItem('my_notes',JSON.stringify(newNote));
        console.log('已保存笔记数据到本地存储');
        },500)
    },{deep:true})

    const isSidebarOpen = ref(true);
    const createdNotes = computed(()=>notes.value?.filter(n=>n.type==='created'));
    // const joinedNotes = computed(()=>notes.value.filter(n=>n.type==='joined'));


    function createNewNote(){
        const newId = Date.now().toString();
        notes.value.unshift({
            id: newId,
            title: '新笔记',
            content: '',
            type: 'created',
            createdAt: Date.now(),
            updatedAt: Date.now()
        });
        currentNoteId.value = newId;
    };
    const selectNote = (id:string)=>{
        currentNoteId.value = id;
    }


    const deleteNote = (id:string)=>{
        const index = notes.value.findIndex(n=>n.id === id);
        if(index !== -1){
            notes.value.splice(index,1);// 删除指定笔记
            // 如果删除的是当前选中的笔记，更新 currentNoteId
            if(currentNoteId.value === id){
                currentNoteId.value = '';
            }
        }
    }

    const renameNote = (id:string, newTitle:string)=>{
        const note = notes.value.find(n=>n.id === id);
        if(note){
            note.title = newTitle;
            note.updatedAt = Date.now();
        }
    }

    const updateNote = (id:string, updates:Partial<Note>)=>{
        const note = notes.value.find(n=>n.id === id);
        if(note){
            Object.assign(note,updates);
            note.updatedAt = Date.now();
        }
    }
    function toggleSidebar(val?: boolean) {
      isSidebarOpen.value = val !== undefined ? val : !isSidebarOpen.value;
    };


    return {
        notes,
        isSidebarOpen,
        currentNoteId,
        createdNotes,
        selectNote,
        // joinedNotes,
        createNewNote,
        toggleSidebar,
        updateNote,
        deleteNote,
        renameNote,
    }
})


