import { getCookie, hasCookie, setCookie } from "cookies-next/client";

export const getCookieCart = (): { [id: string]: number } => {
  if (hasCookie("cart")) {
    const cookieCart = JSON.parse((getCookie("cart") as string) ?? "{}");
    return cookieCart;
  }

  return {};
};

export const addProductToCart = (id: string) => {
  const cookieCart = getCookieCart();
  if (cookieCart[id]) {
    cookieCart[id]++;
  } else {
    cookieCart[id] = 1;
  }

  setCookie("cart", JSON.stringify(cookieCart));
};

export const removeProductFromCart = (
  id: string
): { status: string; message: string } => {
  const cookieCart = getCookieCart();
  if (cookieCart[id]) {
    delete cookieCart[id];
    setCookie("cart", JSON.stringify(cookieCart));
    return { status: "success", message: "Product has been deleted from cart" };
  }

  return { status: "error", message: "The product is not in your cart" };
};

export const removeSingleItemFromCart = (id: string) => {
  const cookieCart = getCookieCart();
  if (cookieCart[id] === 1) {
    delete cookieCart[id];
  } else {
    cookieCart[id]--;
  }
  setCookie("cart", JSON.stringify(cookieCart));
};
