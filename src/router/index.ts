import {createRouter, createWebHistory, type RouteRecordRaw} from 'vue-router'
import MainLayout from '../components/layout/MainLayout.vue'

const routes: RouteRecordRaw[] = [
    {
        path:'/',
        component: MainLayout,
        children:[
            {
                path:'',
                name:'Home',
                component:()=>import('@/views/NoteEditor.vue'),
                meta:{title:'我的笔记'}
            },
        ]
    },
    {
        path:'/:mathMath(.*)*',
        component:()=>import ('../views/errors/404.vue'),
        name:'not-found',
        meta:{
            title:'404页面'
        }
    },
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
})


router.beforeEach((to)=>{
    document.title = to.meta.title as string || 'AI笔记工具'
})

export default router;