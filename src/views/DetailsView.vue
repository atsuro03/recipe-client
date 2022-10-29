<template>
    <el-row>
        <div class="d-flex justify-content-end">
            <el-button
                type="primary"
                @click="backPage">戻る</el-button>
        </div>
        <el-col :span="24">
            <el-card class="text-position">
                <div class="d-flex justify-content-start" slot="header">
                    <h3>{{data.menu}}</h3>
                    <el-tag type="success" class="mx-3">{{data.category}}</el-tag>
                </div>
                <div>
                    <h5>材料</h5>
                    <div class="px-4 box-layout">
                        <p>{{data.material}}</p>
                    </div>  
                    <h5>作り方</h5>
                    <div class="px-4 box-layout">
                        <p>{{data.step}}</p>
                    </div>
                    <h5>ポイント</h5>
                    <div class="px-4 box-layout">
                        <p>{{data.point}}</p>
                    </div>
                </div>
            </el-card>
        </el-col>
    </el-row>
</template>

<script>

    export default {
        name: 'DetailsView',
        data () {
            return {
                selectRecipes: this.$route.params.recipeData[0],
                data: {
                    menu: undefined,
                    category: undefined,
                    material: undefined,
                    step: undefined,
                    point: undefined
                }
            }
        }
        ,
        created: function () {
            this.insertRecipeData()
        }
        ,
        methods: {
            backPage: function () {
                this.$router.push({name: 'recipe'})
            },
            insertRecipeData: function () {
                this.data.menu = this.selectRecipes.menu,
                this.data.category = this.selectRecipes.category,
                this.data.material = this.selectRecipes.material,
                this.data.step = this.selectRecipes.step,
                this.data.point = this.selectRecipes.point
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "../styles/base";
</style>