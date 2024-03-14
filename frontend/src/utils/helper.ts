import { API_URL } from "../Services/config";

export type RemoveReadonly<T> = { -readonly [P in keyof T]: T[P] };

export type TAPIResponse<T> = { status: number; data: T };

export const IMAGE_PATH = `${API_URL}/storage`;

export function isNumber(str: string) {
  return /^\d+$/.test(str);
}

export function convertImageToBase64(imgUrl: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.height = image.naturalHeight;
      canvas.width = image.naturalWidth;
      ctx?.drawImage(image, 0, 0);
      const dataUrl = canvas.toDataURL();

      resolve(dataUrl);
    };
    image.onerror = (error) => {
      reject(error);
    };
    image.src = imgUrl;
  });
}

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

export function isAPIDeleteResponse(responseData: unknown) {
  return (
    responseData &&
    typeof responseData === "object" &&
    "msg" in responseData &&
    typeof responseData.msg === "string" &&
    responseData.msg.includes("Delete")
  );
}

export function hasCommonElements<T>(array1: T[], array2: T[]): boolean {
  const set1 = new Set(array1);
  for (const element of array2) {
    if (set1.has(element)) {
      return true;
    }
  }
  return false;
}

// export function

// LIMIT : 40
