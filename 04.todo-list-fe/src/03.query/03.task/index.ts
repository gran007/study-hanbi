import { useMutation } from "@tanstack/react-query";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "@/05.util/axios";

interface CreateTaskDto {
  readonly projectId: number;
  readonly boardId: number;
  readonly priority: number;
  readonly orderNo: number;
  readonly name: string;
}

interface UpdateTaskDto {
  readonly id: number;
  readonly name: string;
}

interface UpdateTaskOrder {
  readonly id: number;
  readonly orderNo: number;
}

interface CreateAndUpdateTaskOrderDto {
  task: CreateTaskDto,
  taskList: UpdateTaskOrder[],
}


interface DeleteTaskDto {
  readonly id: number;
}

// export function useTaskListQuery(boardId: number) {
//   return useQuery({
//     queryKey: ['task', 'list', boardId],
//     queryFn: async () => {
//       return await axios.get(`/task/board/${boardId}`);
//     },
//   });
// };

export function useAddTaskQuery(clear: Function) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (dto: CreateTaskDto) => {
      return await axios.post('/task', dto);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['board', 'list'],
      });
      clear();
    }
  });
};

export function useAddAndUpdatTaskQuery(clear: Function) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (dto: CreateAndUpdateTaskOrderDto) => {
      await axios.post('/task', dto.task);
      await axios.patch('tast/order', dto.taskList);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['board', 'list'],
      });
      clear();
    }
  });
};


export function useUpdateTaskQuery(clear: Function) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (dto: UpdateTaskDto) => {
      return await axios.patch('/task', dto);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['board', 'list'],
      });
      clear();
    }
  });
};

export function useUpdateTaskOrderQuery(clear: Function) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (dtoList: UpdateTaskOrder[]) => {
      return await axios.patch('/task/order', dtoList);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['board', 'list'],
      });
      clear();
    }
  });
};

export function useDeleteTaskQuery(clear: Function) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (dto: DeleteTaskDto) => {
      return await axios.delete('/task', { data: dto })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['board', 'list'],
      });
      clear();
    }
  });
};
