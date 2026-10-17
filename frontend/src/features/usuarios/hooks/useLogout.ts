"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { api } from "@/lib/api";

export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      await api.post("/auth/logout/");
    },
    onSuccess: () => {
      queryClient.setQueryData(["usuario-actual"], null);
    },
  });
}
