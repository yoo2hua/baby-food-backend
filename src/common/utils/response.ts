export function success(data: any) {
  return {
    code: 0,
    message: "ok",
    data,
  };
}

export function error(message: string, code: number) {
  return {
    code,
    message,
    data: null,
  };
}

export const response = {
  success,
  error,
};
