import { useMutation } from "@tanstack/react-query";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "@/05.util/axios";

interface CreateBoardDto {
  readonly projectId: number;
  readonly name: string;
  readonly orderNo: number;
}

interface UpdateBoardDto {
  readonly id: number;
  readonly name: string;
}

interface UpdateBoardOrder {
  readonly id: number;
  readonly orderNo: number;
}

interface DeleteBoardDto {
  readonly id: number;
}

export function useBoardListQuery(projectId: number) {
  return useQuery({
    queryKey: ['board', 'list', projectId],
    queryFn: async () => {
      return await axios.get(`/board/project/${projectId}`);
    },
  });
};

export function useAddBoardQuery(projectId: number, clear: Function) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (dto: CreateBoardDto) => {
      return await axios.post('/board', dto);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['board', 'list', projectId],
      });
      clear();
    }
  });
};

export function useUpdateBoardQuery(projectId: number, clear: Function) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (dto: UpdateBoardDto) => {
      return await axios.patch('/board', dto);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['board', 'list', projectId],
      });
      clear();
    }
  });
};

export function useUpdateBoardOrderQuery(projectId: number, clear: Function) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (dtoList: UpdateBoardOrder[]) => {
      return await axios.patch('/board/order', dtoList);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['board', 'list', projectId],
      });
      clear();
    }
  });
};

export function useDeleteBoardQuery(projectId: number, clear: Function) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (dto: DeleteBoardDto) => {
      return await axios.delete('/board', { data: dto })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['board', 'list', projectId],
      });
      clear();
    }
  });
};
