import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService){}


    @Get()
    getTasks(@Query(ValidationPipe) filterDto: GetTasksFilterDto): Promise<Task[]>{
       return this.tasksService.getTasks(filterDto);
    } 

    @Get('/:id')
    getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task>{
       return this.tasksService.getTaskById(id);
    } 

    @Post()
    @UsePipes(ValidationPipe)
    createTasks(@Body() createTasksDto: CreateTaskDto): Promise<Task> {
        return this.tasksService.createTasks(createTasksDto);
    }

    @Delete('/:id')
    deleteTask(@Param('id', ParseIntPipe) id: number): Promise<void>{
       return this.tasksService.deleteTask(id);
    }
    
    @Patch('/:id/status')
    updateTaskStatus(
        @Param('id', ParseIntPipe) id: number,
        @Body('status', new TaskStatusValidationPipe) status: TaskStatus
    ): Promise<Task>{
        console.log('id',id)
        console.log('status',status)
        return this.tasksService.updateTaskStatus(id,status);
    }
}
