export default {
  path: "/",
  name: "",
  component: () => import("@/components/entities/relation/Layout"),
  redirect: { name: "RelationList" },
  children: [
    {
      name: "RelationList",
      path: "",
      component: () => import("@/views/relation/List"),
    },
    {
      name: "RelationCreate",
      path: "new",
      component: () => import("@/views/relation/Create"),
    },
    {
      name: "RelationUpdate",
      path: ":id/edit",
      component: () => import("@/views/relation/Update"),
    },
    {
      name: "RelationShow",
      path: ":id",
      component: () => import("@/views/relation/Show"),
    },
  ],
};
