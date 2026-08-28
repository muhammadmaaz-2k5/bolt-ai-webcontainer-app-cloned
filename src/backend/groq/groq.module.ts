import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroqGeneration } from '../entities/groq-generation.entity';
import { Project } from '../entities/project.entity';
import { GroqService } from './groq.service';
import { GroqController } from './groq.controller';

@Module({
  imports: [TypeOrmModule.forFeature([GroqGeneration, Project])],
  controllers: [GroqController],
  providers: [GroqService],
  exports: [GroqService],
})
export class GroqModule {}
