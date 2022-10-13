import { defineUserConfig } from "vuepress";
import type { DefaultThemeOptions } from "vuepress";
import recoTheme from "vuepress-theme-reco";
import vue from "@vitejs/plugin-vue";

export default defineUserConfig({
  title: "想走过亚洲的熊",
  description: "Just playing around",
  theme: recoTheme({
    style: "@vuepress-reco/style-default",
    logo: "/logo.jpg",
    author: "想走过亚洲的熊",
    docsRepo: "https://github.com/vuepress-reco/vuepress-theme-reco-next",
    docsBranch: "main",
    docsDir: "example",
    catalogTitle: "标题目录",
    autoSetCategory: true, // 自动设置分类
    // autoAddCategoryToNavbar: true, // 自动将首页、分类和标签添加至头部导航条
    lastUpdatedText: "上次更新时间",
    // series 为原 sidebar
    series: {
      "/docs/theme-reco/": [
        {
          text: "module one",
          children: ["home", "theme", "pyquery"],
        },
        {
          text: "module two",
          children: ["api", "plugin"],
        },
      ],
      "/docs/html5/": [
        {
          text: "文章导航",
          children: ["1", "2"],
        },
      ],
      "/docs/css3/": [
        {
          text: "文章导航",
          children: ["1", "2"],
        },
      ],
      "/docs/other/": [
        {
          text: "文章导航",
          children: ["plan"],
        },
      ],
      "/docs/python/many/": [
        {
          text: "文章导航",
          children: ["1"],
        },
      ],
      "/docs/python/django/": [
        {
          text: "文章导航",
          children: ["1"],
        },
      ],
      "/docs/vue/": [
        {
          text: "文章导航",
          children: ["1"],
        },
      ],
    },
    navbar: [
      { text: "指南", link: "/docs/guide" },
      { text: "分类", link: "/categories/html5/1/" },
      { text: "标签", link: "/tags/html5/1/" },
      {
        text: "前端教程",
        children: [
          { text: "html5教程", link: "/docs/html5/1" },
          { text: "css3教程", link: "/docs/css3/1" },
          { text: "vue教程", link: "/docs/vue/1" },
          // { text: "html5教程", link: "/blogs/html5/haha.md" },
        ],
      },
      {
        text: "Python教程",
        children: [
          { text: "多线程教程", link: "/docs/python/many/1" },
          { text: "django教程", link: "/docs/python/django/1" },
        ],
      },
      {
        text: "后端教程",
        children: [
          { text: "测试一", link: "#" },
          { text: "测试二", link: "#" },
        ],
      },
      {
        text: "进阶计划",
        children: [{ text: "2022年计划", link: "/docs/other/plan" }],
      },
    ],
    bulletin: {},
  }),
  plugins: [vue()],
});
