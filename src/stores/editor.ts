import { defineStore } from "pinia";
import { ref } from "vue";
export const useEditorStore = defineStore('editor',()=>{
    const isEditMode = ref(false);

    const toggleEditMode = (value?:boolean)=>{
        isEditMode.value = value !== undefined ? value: !isEditMode.value;
    }

    const enableEditMode = ()=>{
        isEditMode.value = true;
    }

    const disableEditMode = ()=>{
        isEditMode.value = false;
    }



    return {
        isEditMode,
        toggleEditMode,
        enableEditMode,
        disableEditMode,
    }
})