export default {
  path: "/addresses",
  name: "Addresses",
  component: () => import("@/components/entities/address/Layout"),
  redirect: { name: "AddressList" },
  children: [
    {
      name: "AddressList",
      path: "",
      component: () => import("@/views/address/List"),
    },
    {
      name: "AddressCreate",
      path: "new",
      component: () => import("@/views/address/Create"),
    },
    {
      name: "AddressUpdate",
      path: ":id/edit",
      component: () => import("@/views/address/Update"),
    },
    {
      name: "AddressShow",
      path: ":id",
      component: () => import("@/views/address/Show"),
    },
  ],
};
