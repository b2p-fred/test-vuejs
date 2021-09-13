export default {
  path: "/documentversions",
  name: "DocumentVersions",
  component: () => import("@/components/entities/documentversion/Layout"),
  redirect: { name: "DocumentVersionList" },
  children: [
    {
      name: "DocumentVersionList",
      path: "",
      component: () => import("@/views/documentversion/List"),
    },
    {
      name: "DocumentVersionCreate",
      path: "new",
      component: () => import("@/views/documentversion/Create"),
    },
    {
      name: "DocumentVersionUpdate",
      path: ":id/edit",
      component: () => import("@/views/documentversion/Update"),
    },
    {
      name: "DocumentVersionShow",
      path: ":id",
      component: () => import("@/views/documentversion/Show"),
    },
  ],
};
