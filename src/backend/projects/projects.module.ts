import { Module, Controller, Get, Post, Body, Param } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from '../entities/project.entity';
import { ProjectFile } from '../entities/project-file.entity';

@Controller('projects')
export class ProjectsController {
  @Get()
  async listProjects() {
    return [
      { id: '1', name: 'Bolt AI Web Workspace', framework: 'react-vite', status: 'active' },
      { id: '2', name: 'AI SaaS Landing Page', framework: 'nextjs', status: 'active' },
    ];
  }
}

@Module({
  imports: [TypeOrmModule.forFeature([Project, ProjectFile])],
  controllers: [ProjectsController],
})
export class ProjectsModule {}
