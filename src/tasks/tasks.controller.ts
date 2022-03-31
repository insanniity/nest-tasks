import {
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Redirect,
  Render,
  Req,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskStatus } from './task-status-enum';
import { Tasks } from './tasks.entity';
import { TasksRepository } from './tasks.repository';
import { Request } from 'express';

@Controller('tasks')
export class TasksController {
  constructor(
    @InjectRepository(TasksRepository)
    private tasksRepository: TasksRepository,
  ) {}

  @Get('/home')
  @Render('home')
  root() {
    //
  }

  @Get('/index')
  @Render('index')
  index() {
    return this.tasksRepository.getTasks().then((tasks) => ({ tasks }));
  }

  @Get('/create')
  @Render('create')
  create(): void {
    //
  }

  @Get('/:id/edit')
  @Render('edit')
  async edit(@Param('id') id: string) {
    const task = await this.tasksRepository.findOne(id);

    return { task };
  }

  @Get('/:id')
  @Render('show')
  async show(@Param('id') id: string) {
    const task = await this.tasksRepository.findOne(id);
    return { task };
  }

  @Post()
  @Redirect('/tasks/index')
  async store(@Req() request: Request) {
    const task = new Tasks();

    task.status = TaskStatus.OPEN;
    task.description = request.body['description'];
    task.title = request.body['title'];

    await this.tasksRepository.save(task);

    return { task };
  }

  @Patch('/:id')
  @Redirect('/tasks/index')
  async update(@Param('id') id: string, @Req() request: Request) {
    const task = await this.tasksRepository.findOne(id);

    task.status = request.body['status'];
    task.description = request.body['description'];
    task.title = request.body['title'];

    await this.tasksRepository.save(task);

    return { task };
  }

  @Delete('/:id')
  @Redirect('/tasks/index')
  delete(@Param('id') id: string) {
    return this.tasksRepository.delete(id);
  }
}
