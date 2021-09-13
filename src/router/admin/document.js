export default {
  path: "/documents",
  name: "Documents",
  component: () => import("@/components/entities/document/Layout"),
  redirect: { name: "DocumentList" },
  children: [
    {
      name: "DocumentList",
      path: "",
      component: () => import("@/views/document/List"),
    },
    {
      name: "DocumentCreate",
      path: "new",
      component: () => import("@/views/document/Create"),
    },
    {
      name: "DocumentUpdate",
      path: ":id/edit",
      component: () => import("@/views/document/Update"),
    },
    {
      name: "DocumentShow",
      path: ":id",
      component: () => import("@/views/document/Show"),
    },
  ],
};
