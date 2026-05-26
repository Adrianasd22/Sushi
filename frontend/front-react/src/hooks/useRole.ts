
export type UserRole = "admin" | "worker" | "user";

export function useRole(): UserRole | null {
  const role = localStorage.getItem("role");
  if (role === "admin" || role === "worker" || role === "user") return role;
  return null;
}

export function getName(): string | null {
  const name  = localStorage.getItem("name");
  return name? name: "NoName";
}