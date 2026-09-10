import { inject, Service } from '@angular/core';
import { SupabaseService } from '@core/services/supabase.service';
import { TaskUpdates } from '@features/board-tasks/models/tasks.models';

@Service()
export class TaskRepository {
  private supabaseService = inject(SupabaseService);

  private get supabase() {
    return this.supabaseService.client;
  }

  public getTasks(boardId: string) {
    return this.supabase.from('tasks').select('*').eq('board_id', boardId);
  }

  public addTask(boardId: string, userId: string, details: TaskUpdates) {
    return this.supabase
      .from('tasks')
      .insert({ board_id: boardId, created_by: userId, ...details })
      .select()
      .single();
  }

  public deleteTask(taskId: string) {
    return this.supabase.from('tasks').delete().eq('id', taskId);
  }

  public updateTask(taskId: string, updates: TaskUpdates) {
    return this.supabase
      .from('tasks')
      .update(updates)
      .eq('id', taskId)
      .select()
      .single();
  }
}
