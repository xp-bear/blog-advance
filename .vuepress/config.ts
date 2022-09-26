import { defineUserConfig } from "vuepress";
import type { DefaultThemeOptions } from "vuepress";
import recoTheme from "vuepress-theme-reco";

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
      //vue3 文章
      "/docs/front/vue3": [
        {
          text: "文章导航",
          children: ["home"],
        },
      ],
      //js 文章
      "/docs/front/js": [
        {
          text: "文章导航",
          children: ["home"],
        },
      ],
      //后端文章
      "/docs/end": [
        {
          text: "文章导航",
          children: ["home"],
        },
      ],
      //python文章
      "/docs/python": [
        {
          text: "文章导航",
          children: ["home"],
        },
      ],
      //python文章
      "/docs/interview": [
        {
          text: "文章导航",
          children: ["home"],
        },
      ],
    },
    navbar: [
      { text: "首页", link: "/" },
      { text: "指南", link: "/docs/guide" },
      // { text: "分类", link: "/categories/docs/1/" },
      // { text: "标签", link: "/tags/docs/1/" },
      {
        text: "前端",
        children: [
          { text: "VUE3教程", link: "/docs/front/vue3/home" },
          { text: "JS教程", link: "/docs/front/js/home" },
        ],
      },
      {
        text: "后端",
        children: [{ text: "JAVA教程", link: "/docs/end/home" }],
      },
      {
        text: "Python",
        children: [{ text: "Python教程", link: "/docs/python/home" }],
      },
      {
        text: "前端面试题",
        children: [{ text: "面试题教程", link: "/docs/interview/home" }],
      },
      {
        text: "算法",
        children: [
          { text: "vuepress-reco", link: "/docs/theme-reco/theme" },
          { text: "vuepress-theme-reco", link: "/blogs/other/guide" },
        ],
      },
    ],
    bulletin: {},
  }),
});
