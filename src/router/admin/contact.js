export default {
  path: "/contacts",
  name: "Contacts",
  component: () => import("@/components/entities/contact/Layout"),
  redirect: { name: "ContactList" },
  children: [
    {
      name: "ContactList",
      path: "",
      component: () => import("@/views/contact/List"),
    },
    {
      name: "ContactCreate",
      path: "new",
      component: () => import("@/views/contact/Create"),
    },
    {
      name: "ContactUpdate",
      path: ":id/edit",
      component: () => import("@/views/contact/Update"),
    },
    {
      name: "ContactShow",
      path: ":id",
      component: () => import("@/views/contact/Show"),
    },
  ],
};
