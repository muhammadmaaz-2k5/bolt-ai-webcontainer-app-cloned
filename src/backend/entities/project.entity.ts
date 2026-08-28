import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
  Index,
  Unique,
} from 'typeorm';
import { Workspace } from './workspace.entity';
import { ProjectFile } from './project-file.entity';
import { GroqGeneration } from './groq-generation.entity';

@Entity('projects')
@Unique(['workspaceId', 'slug'])
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column({ type: 'uuid', name: 'workspace_id' })
  workspaceId: string;

  @ManyToOne(() => Workspace, (workspace) => workspace.projects, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'workspace_id' })
  workspace: Workspace;

  @Column({ type: 'varchar', length: 120 })
  name: string;

  @Column({ type: 'varchar', length: 120 })
  slug: string;

  @Column({ type: 'varchar', length: 40, default: 'react-vite' })
  framework: string;

  @Column({ type: 'varchar', length: 30, default: 'active' })
  status: string;

  @OneToMany(() => ProjectFile, (file) => file.project)
  files: ProjectFile[];

  @OneToMany(() => GroqGeneration, (gen) => gen.project)
  generations: GroqGeneration[];

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
  updatedAt: Date;
}
