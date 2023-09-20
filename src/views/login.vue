<template>
    <div class="box">
        <div class="login">
            <p class="jy">积云后台</p>
            <div class="lin">
                <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm"
                    status-icon label-position="top">
                    <el-form-item label="用户名" prop="name">
                        <el-input v-model="ruleForm.name" placeholder="请输入用户名" />
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input v-model="ruleForm.password" placeholder="请输入用户密码" />
                    </el-form-item>
                </el-form>
            </div>
            <p style="text-align: center;">
                <el-button style="background-color: #6579f6; color: #fff;" @click="tohome">登录</el-button>
                <el-button>重置</el-button>
            </p>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";
import { useRouter, useRoute } from "vue-router";
import { getloginApi } from '@/utils/api'
import { ElMessage } from 'element-plus'

const route = useRoute();
const router = useRouter();
const ruleForm = reactive({
    name: '',
    password: '',
})
const rules = reactive({
    name: [
        { required: true, message: '请输入用户名', trigger: 'blur' }
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' }
    ],
})
const tohome = () => {
    getloginApi({ username: ruleForm.name, password: ruleForm.password }).then((res: any) => {
        console.log(res);
        if (res.data.code === 10000) {
            localStorage.setItem('token', res.data.data.token)
            router.push('/')
            ElMessage({
                message: '恭喜登录成功',
                type: 'success',
            })
        } else {
            return false
        }

    })
}

</script>

<style lang="scss" scoped>
.box {
    width: 100%;
    height: 100vh;
    background-color: #d8e0f4;

    .login {
        width: 500px;
        height: 400px;
        background-color: #fff;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        .jy {
            width: 100%;
            height: 70px;
            background-color: #6779f3;
            text-align: center;
            line-height: 70px;
            font-size: 18px;
            color: #fff;
        }

        .lin {
            width: 90%;
            margin: 35px auto;
        }
    }
}
</style>