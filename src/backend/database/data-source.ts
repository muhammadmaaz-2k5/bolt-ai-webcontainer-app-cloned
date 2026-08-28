import { DataSource } from 'typeorm';
import { User } from '../entities/user.entity';
import { Workspace } from '../entities/workspace.entity';
import { Project } from '../entities/project.entity';
import { ProjectFile } from '../entities/project-file.entity';
import { GroqGeneration } from '../entities/groq-generation.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASS || 'maaz',
  database: process.env.DB_NAME || 'bolt',
  entities: [User, Workspace, Project, ProjectFile, GroqGeneration],
  synchronize: true,
  logging: true,
});
