const roles = ["user", "vendor", "admin"];

const roleRights = new Map();

roleRights.set(roles[0], ["logout", "kyc", 'create-store', 'edit-store']);
roleRights.set(roles[1], [
    "logout",
    "store",
    "create-product",
    "edit-product",
    "update-product",
    "create-coupon",
    "edit-coupon"
]);
roleRights.set(roles[2], ["admin", "logout", 'change-product-status', 'delete-product', 'create-product']);

export { roles, roleRights };
