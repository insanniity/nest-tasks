import { EntityRepository, Repository } from 'typeorm';
import { Tasks } from './tasks.entity';

@EntityRepository(Tasks)
export class TasksRepository extends Repository<Tasks> {
  async getTasks(): Promise<Tasks[]> {
    const query = this.createQueryBuilder('tasks');
    const tasks = await query.getMany();
    return tasks;
  }
}
