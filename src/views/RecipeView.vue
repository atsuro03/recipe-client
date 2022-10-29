<template>
    <el-row>
        <sub-header/>
        <div class="d-flex justify-content-end">
            <el-button
                type="success"
                @click="showAddRecipePage">追加</el-button>
        </div>
        <el-col :span="24">
            <el-card class="box-card">
                <div slot="header">
                    <span>レシピ一覧</span>
                </div>
                <el-table
                        :data="recipes.filter(data => !search || data.category.toLowerCase().includes(search.toLowerCase()))"
                        style="width: 100%">
                    <el-table-column
                            prop="id"
                            label="メニューID"
                            width="250"/>
                    <el-table-column
                            prop="menu"
                            label="メニュー"
                            width="250"/>
                    <el-table-column
                            prop="category"
                            label="カテゴリー"
                            width="250"/>
                    <el-table-column
                            prop="operation"
                            label="操作"
                            width="250"
                            align="left">
                        <template slot-scope="scope">
                            <el-button 
                                type="success"
                                @click="recipeDetails(scope.row.id)"
                                icon="el-icon-check" 
                                circle/>
                            <el-button 
                                type="primary" 
                                @click="editRecipe(scope.row.id)"
                                icon="el-icon-edit" 
                                circle/>
                            <el-button 
                                type="danger" 
                                @click="dialogVisible = true"
                                icon="el-icon-delete" 
                                circle/>
                                <el-dialog
                                        title="警告"
                                        :visible.sync="dialogVisible"
                                        width="30%">
                                    <span>
                                        レシピを削除します。<br/>
                                        本当によろしいですか？
                                    </span>
                                    <span slot="footer" class="dialog-footer">
                                        <el-button @click="dialogVisible = false">キャンセル</el-button>
                                        <el-button type="primary" @click="deleteRecipe(scope.row.id), dialogVisible = false">削除</el-button>
                                    </span>
                                </el-dialog>
                        </template>
                    </el-table-column>
                    <el-table-column>
                        <template slot="header">
                            <el-input
                                v-model="search"
                                size="small"
                                placeholder="カテゴリー検索"/>
                        </template>
                    </el-table-column>
                </el-table>
            </el-card>
        </el-col>
    </el-row>
</template>

<script>

    import axios from 'axios'
    import SubHeader from '../components/SubHeader';

    export default {
        name: "RecipeView",
        components: {SubHeader},
        data () {
            return {
                recipes: [],
                selectRecipes: [],
                dialogVisible: false,
                search: undefined
            }
        },
        created: async function () {
            await this.refresh()
        },
        methods: {
            refresh: async function () {
                const res = await axios.get('http://localhost:8080/')
                this.recipes = res.data.recipes
                
            }
            ,
            showAddRecipePage: function () {
                this.$router.push({name: 'add'})
            }
            ,
            recipeDetails: async function (id) {
                const res = await axios.get('http://localhost:8080/' + id)
                this.selectRecipes = res.data.recipes
                this.$router.push({
                    name: 'details',
                    params: {
                        recipeData: this.selectRecipes
                    }
                })
            }
            ,
            editRecipe: async function (id) {
                const res = await axios.get('http://localhost:8080/' + id)
                this.selectRecipes = res.data.recipes
                this.$router.push({
                    name: 'edit',
                    params: {
                        recipeData: this.selectRecipes
                    }
                })
            }
            ,
            deleteRecipe: async function (id) {
                await axios.delete('http://localhost:8080/' + id)
                await this.refresh()
                this.$message({
                    showClose: true,
                    message: 'レシピを削除しました。',
                    type: 'success'
                })
            }
        }
    }
</script>

<style scoped>

</style>
