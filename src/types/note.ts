// 笔记接口，Interface 是 TypeScript 中一种用于定义对象结构的类型声明方式
export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: number;
  updatedAt: number;
}

export interface NoteState {
  notes: Note[];// 笔记数组，存储所有笔记
  currentNoteId: string | null;// 当前选中的笔记ID，null 表示未选中
}