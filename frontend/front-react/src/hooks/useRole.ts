
export type UserRole = "admin" | "worker";

export function useRole(): UserRole | null {
  const role = localStorage.getItem("role");
  if (role === "admin" || role === "worker") return role;
  return null;
}

export function getName(): string | null {
  const name  = localStorage.getItem("name");
  return name? name: "NoName";
}