<template>
  <div>
    <div class="common-layout">
      <el-container>
        <el-aside width="200px">
          <p class="hed">面经</p>

          <el-menu active-text-color="#ffd04b" background-color="#28313e" class="el-menu-vertical-demo" default-active="2"
            text-color="#fff" router>
            <el-menu-item index="board">
              <el-icon>
                <PieChart />
              </el-icon>
              <span>数据看板</span>
            </el-menu-item>
            <el-menu-item index="manage">
              <el-icon>
                <Notebook />
              </el-icon>
              <span>面经管理</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-container>
          <el-header>
            <div>
              <span>
                <el-icon style="font-size: 18px;">
                  <RefreshRight @click="gogo" />
                </el-icon>
              </span>
              <span>
                <el-icon style="font-size: 18px;">
                  <Platform />
                </el-icon>
              </span>
            </div>
            <div style="display: flex;align-items: center;">
              <div class="header-img">
                <img src="../assets/logo.png" alt="">
                <p>admin</p>
              </div>



              <el-popconfirm confirm-button-text="确定" cancel-button-text="取消" :icon="InfoFilled" icon-color="#626AEF"
                title="您确定要退出登录吗" @confirm="confirmEvent" @cancel="cancelEvent">
                <template #reference>
                  <el-icon style="margin-left: 15px; font-size: 20px;">
                    <SwitchButton />
                  </el-icon>
                </template>
              </el-popconfirm>









            </div>
          </el-header>
          <el-main>
            <el-breadcrumb :separator-icon="ArrowRight">
              <el-breadcrumb-item v-for="item, index in route.meta.title">{{ item }}</el-breadcrumb-item>
            </el-breadcrumb>
            <router-view></router-view>
          </el-main>
        </el-container>
      </el-container>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";
import { useRouter, useRoute } from "vue-router";
import { ElMessage } from 'element-plus'
import { ArrowRight } from '@element-plus/icons-vue'
import {
  RefreshRight,
  Platform,
  SwitchButton,
  PieChart,
  Notebook,
  InfoFilled
} from '@element-plus/icons-vue'
import { } from '@/utils/api'
const route = useRoute();
const router = useRouter();
const confirmEvent = () => {
  localStorage.removeItem('token')
  router.push('/login')
  ElMessage({
    message: '已退出登录',
    type: 'success',
  })
}
const cancelEvent = () => {
  ElMessage({
    message: '已取消',
    type: 'warning',
  })
}
const gogo = () => {
  router.go(0)
}
</script>

<style lang="scss" scoped>
.el-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  height: 40px;

  .header-img {
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 100px;
    height: 40px;
    background-color: #f1f2f5;

    img {
      width: 20px;
    }
  }
}

.el-aside {
  background-color: #28313e;
  height: calc(100vh);

  .hed {
    text-align: center;
    font-size: 22px;
    color: #fff;
    padding: 25px 0px;

  }
}
</style>