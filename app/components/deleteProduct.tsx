export async function deleteProduct(id: string) {
  try {
    const res = await fetch(
      `https://68249f320f0188d7e72a172a.mockapi.io/coffeeProduct/${id}`,
      {
        method: "DELETE",
      }
    );

    if (!res.ok) {
      throw new Error("خطا در حذف محصول");
    }

    return true; // موفق
  } catch (err) {
    console.error(err);
    return false; // ناموفق
  }
}
