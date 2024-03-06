import { temporaryLoginInfo } from "@/lib/data";

export const onLogin = (formData: FormData) => {
  const username = formData.get("username");
  const password = formData.get("password");
  const role = formData.get("role");
  let id = "";
  const isValid: boolean = temporaryLoginInfo.some((e) => {
    if (e.username === username && e.password === password && e.role === role) {
      id = e.id;
      return true;
    }
  });
  return isValid ? { username, id } : null;
};
