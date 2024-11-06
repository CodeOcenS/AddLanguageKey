在 Axure 需求中添加多语言 Key



## 使用说明

使用 Edge 或者 Chrome 添加已解压的插件(dist目录)。

准备需要匹配的多语言 Excel,(**首行包含Key|En**)。打开对应的 Axure 需求页面，选择插件，选择文件后自动匹配。

源码有改动后，需要保存后使用`vite build`重新编译打包。

npm run dev: 开启本地端口调试(主要用于调试页面)。 



## 已知问题

目前存在少量不配不上。

## 基本原理

使用 SheetJS 读取excel, 对 `p ， span` 的文本进行匹配。

匹配是基于`<iframe id=mianFrame>` 解析。如果没有任何匹配上，请检查是否有该 `iframe`



# 参考资料

[Chrome Extention Vite+React+Typescript+](https://singlequote.blog/chrome-extension-using-vite-typescript-react-stepwise-process/)

[操作 SheetJS](https://juejin.cn/post/6896836985592381448)

[youtube 视频讲解](https://www.youtube.com/watch?v=GGi7Brsf7js)





# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
