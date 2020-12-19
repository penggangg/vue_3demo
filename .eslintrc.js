module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/standard',
    '@vue/typescript/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  plugins: [
    'vue'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // allow async-await
    'generator-star-spacing': 'off',
    'no-debugger': 'off',
    // 四个空格缩进
    'indent': ['error', 4, {'SwitchCase': 1}],
    // 使用let, const代替var声明变量
    'no-var': ['error'],
    // 连续的变量声明只使用一个let或const关键字
    // 'one-var': ['error', 'consecutive'],
    // 要求或禁止 var 声明中的初始化
    'init-declarations': 2,
    // 强制使用单引号
    'quotes': ['error', 'single'],
    // 要求使用分号
    'semi': ['error', 'always'],
    // 禁止不必要的分号
    'no-extra-semi': 'error',
    // 函数声明时'('前是是否加一个空格
    'space-before-function-paren': ["error", "never"],
    // 分支判断时，始终使用大括号
    'curly': ['error', 'all'],
    "@typescript-eslint/no-explicit-any": ["off"],
    "@typescript-eslint/no-var-requires": ["off"]
  }
}
