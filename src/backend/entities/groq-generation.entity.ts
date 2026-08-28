import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { Project } from './project.entity';

@Entity('groq_generations')
export class GroqGeneration {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column({ type: 'uuid', name: 'project_id' })
  projectId: string;

  @ManyToOne(() => Project, (project) => project.generations, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'project_id' })
  project: Project;

  @Column({ type: 'text', name: 'user_prompt' })
  userPrompt: string;

  @Column({ type: 'text', name: 'system_prompt' })
  systemPrompt: string;

  @Column({ type: 'varchar', length: 100, nullable: true, name: 'generated_component_name' })
  generatedComponentName?: string;

  @Column({ type: 'integer', name: 'latency_ms' })
  latencyMs: number;

  @Column({ type: 'numeric', precision: 7, scale: 2, default: 280.50, name: 'tokens_per_second' })
  tokensPerSecond: number;

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt: Date;
}
