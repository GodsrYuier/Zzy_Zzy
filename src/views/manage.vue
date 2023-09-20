<template>
    <div>

        <div class="box">

            <div class="hed">
                <p style="font-size: 20px;">共{{ goods.total }}条记录</p>
                <el-button style="background-color: #6678f0; color: #fff; border-radius: 20px; height: 40px;"
                    @click="addOpen"><el-icon>
                        <Plus />
                    </el-icon>添加面经</el-button>
            </div>
            <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="stem" label="标题" />
                <el-table-column prop="creator" label="作者" />
                <el-table-column prop="likeCount" label="点赞" />
                <el-table-column prop="views" label="浏览数" />
                <el-table-column prop="createdAt" label="更新时间" />
                <el-table-column prop="date" label="操作">
                    <template #default="scope">
                        <el-button :icon="View" @click="open(scope.row)" circle style="border: 0px;" />
                        <el-button :icon="EditPen" @click="Editos(scope.row)" circle style="border: 0px;" />
                        <el-button :icon="Delete" @click="Detile(scope.row)" circle style="border: 0px;" />

                    </template>
                </el-table-column>
            </el-table>
            <div class="bo">
                <el-pagination background layout="prev, pager, next" :total="goods.total"
                    @current-change="handleCurrentChange" />
            </div>
        </div>


        <!-- 详情抽屉 -->
        <el-drawer v-model="drawer" title="I am the title" :with-header="false">
            <p v-html="goodList.content"></p>
        </el-drawer>
        <!-- 添加抽屉 -->
        <el-drawer v-model="drawwr" :title="title" size="60%">
            <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="70px" class="demo-ruleForm"
                status-icon>
                <el-form-item label="标题" prop="name">
                    <el-input v-model="ruleForm.name" placeholder="请输入面经标题" />
                </el-form-item>
                <el-form-item label="内容" prop="oos" style="width: 100%; height: 120px; margin-bottom: 80px;">
                    <quill-editor theme="snow" v-model:content="ruleForm.arr"
                        style="width: 100%; border: 1px solid #ccc;"></quill-editor>
                </el-form-item>

            </el-form>
            <p style="margin-left: 50px;">
                <el-button style="background-color: #6779f3; color: #fff;" @click="addPi">确定</el-button>
                <el-button>取消</el-button>
            </p>
        </el-drawer>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";
import { useRouter, useRoute } from "vue-router";
import {
    Plus,
    View,
    EditPen,
    Delete
} from '@element-plus/icons-vue'
import { getListApi, getAddApi, getDeleteApi, getEditApi } from '@/utils/api'
const drawer = ref(false)
const arr = ref('')
const drawwr = ref(false)
const title = ref('添加面经')
const route = useRoute();
const Edid = ref(0)
const router = useRouter();
const goods = ref([]) as any
const tableData = ref([])
const num = ref(1)
const goodList = ref([]) as any
const ruleForm = reactive({
    name: '',
    arr: '',
})
const rules = reactive({
    name: [
        { required: true, message: '请输入标题内容', trigger: 'blur' },

    ],
    oos: [
        { required: true, message: '请输入标题内容', trigger: 'blur' },

    ],
})
const getList = () => {
    getListApi({ current: num.value, pageSize: 3, stem: '', keyWord: '' }).then((res: any) => {
        console.log(res);
        tableData.value = res.data.data.rows
        goods.value = res.data.data
    })
}
getList()
const handleCurrentChange = (val: any) => {
    num.value = val
    getList()
}
const open = (row: any) => {
    drawer.value = true
    console.log(row);
    goodList.value = row
}
const addOpen = () => {
    drawwr.value = true
}
const addPi = () => {
    if (title.value == '添加面经') {
        getAddApi({ stem: ruleForm.name, content: ruleForm.arr.ops[0].insert }).then((res: any) => {
            console.log(res);
            getList()

        })
    } else {
        getEditApi({ stem: ruleForm.name, content: ruleForm.arr.ops[0].insert, id: Edid.value }).then((res: any) => {
            console.log(res);
            getList()

        })
    }

}
const Detile = (row: any) => {
    console.log(row.id);

    getDeleteApi({ id: row.id }).then((res: any) => {
        console.log(res);
        getList()
    })
}
const Editos = (row: any) => {
    title.value = '编辑面经'
    drawwr.value = true
    ruleForm.name = row.stem
    // ruleForm.arr.ops = row.content
    Edid.value = row.id
}
</script>

<style lang="scss" scoped>
.box {
    border: 1px solid #ebeef5;
    width: 90%;
    margin-top: 30px;

    .hed {
        width: 100%;
        height: 80px;
        border: 1px solid #ebeef5;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 25px;

    }

    .bo {
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
}
</style>