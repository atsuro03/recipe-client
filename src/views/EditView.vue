<template>
    <el-row>
        <div class="d-flex justify-content-end">
            <el-button
                type="primary"
                @click="backPage">戻る</el-button>
        </div>
        <el-col :span="24">
            <el-card class="box-card1">
                <el-form :model="request" :rules="rules" ref="request" label-width="120px" class="demo-ruleForm">
                    <div class="d-flex justify-content-center">
                        <el-col :span="12">
                            <el-form-item label="メニュー" prop="menu">
                                <el-input v-model="request.menu"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12" class="d-flex justify-content-center">  
                            <el-form-item label="カテゴリー" prop="category">
                                <el-select v-model="request.category">
                                    <el-option label="主食" value="主食"></el-option>
                                    <el-option label="副食" value="副食"></el-option>
                                    <el-option label="肉類" value="肉類"></el-option>
                                    <el-option label="魚類" value="魚類"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </div>
                    <el-form-item label="材料" prop="material">
                        <el-input type="textarea" v-model="request.material"></el-input>
                    </el-form-item>
                    <el-form-item label="作り方" prop="step">
                        <el-input type="textarea" v-model="request.step" rows="11"></el-input>
                    </el-form-item>
                    <el-form-item label="ポイント" prop="point">
                        <el-input type="textarea" v-model="request.point"></el-input>
                    </el-form-item>
                    <el-button
                        type="success"
                        class="addBnt"
                        @click="checkForm('request')">追加</el-button>
                </el-form>
            </el-card>
        </el-col>
    </el-row>
</template>

<script>

    import axios from 'axios'
    import recipeView from './RecipeView'

    export default {
        name: "EditView",
        data () {
            return {
                selectRecipes: this.$route.params.recipeData[0],
                request: {
                    menu: undefined,
                    category: undefined,
                    material: undefined,
                    step: undefined,
                    point: undefined
                },
                rules: {
                    menu: [
                        { required: true, message: 'メニュー名を記載してください', trigger: 'blur' },
                    ],
                    category: [
                        { required: true, message: 'カテゴリーを選択してください', trigger: 'change' }
                    ],
                    material: [
                        { required: true, message: '材料を記載してください', trigger: 'blur' }
                    ],
                    step: [
                        { required: true, message: '作り方を記載してください', trigger: 'blur' }
                    ]
                }
            }
        },
        created: function () {
            this.insertRecipeData()
        },
        methods: {
            backPage: function () {
                this.$router.push({name: 'recipe'})
            },
            checkForm: function (formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.editRecipe()
                    }
                })
            },
            editRecipe: async function () {
                await axios.put('http://localhost:8080/' + this.selectRecipes.id, this.request)
                this.$router.push({
                    name: 'recipe'
                })
                this.$message({
                    showClose: true,
                    message: "レシピを追加しました。",
                    type: 'success'
                })
                await recipeView.refresh()
            },
            insertRecipeData: function () {
                this.request.menu = this.selectRecipes.menu,
                this.request.category = this.selectRecipes.category,
                this.request.material = this.selectRecipes.material,
                this.request.step = this.selectRecipes.step,
                this.request.point = this.selectRecipes.point
            }
        }
    }
</script>