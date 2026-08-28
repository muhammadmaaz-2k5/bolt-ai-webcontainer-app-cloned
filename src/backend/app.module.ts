import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { User } from './entities/user.entity';
import { Workspace } from './entities/workspace.entity';
import { Project } from './entities/project.entity';
import { ProjectFile } from './entities/project-file.entity';
import { GroqGeneration } from './entities/groq-generation.entity';

import { GroqModule } from './groq/groq.module';
import { ProjectsModule } from './projects/projects.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', 'src/backend/.env'],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DB_HOST', 'localhost'),
        port: config.get<number>('DB_PORT', 5432),
        username: config.get<string>('DB_USER', 'postgres'),
        password: config.get<string>('DB_PASS', 'maaz'),
        database: config.get<string>('DB_NAME', 'bolt'),
        entities: [User, Workspace, Project, ProjectFile, GroqGeneration],
        synchronize: config.get<boolean>('DB_SYNC', true), // auto-sync 3NF tables in development
        logging: ['error', 'warn', 'schema'],
      }),
    }),
    GroqModule,
    ProjectsModule,
  ],
})
export class AppModule {}
