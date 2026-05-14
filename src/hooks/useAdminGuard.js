import { useAuth } from "../context/AuthContext";

export const useAdminGuard = () => {
  const { user, loading, isAdmin } = useAuth();
  return { isAdmin, checking: loading, user };
};
