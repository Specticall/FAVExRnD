export function convertToRupiah(price: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(price);
}

export function isAuthenticated() {
  const token = localStorage.getItem("token");
  return token ? true : false;
}
