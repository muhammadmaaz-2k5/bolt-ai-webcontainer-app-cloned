import { Controller, Post, Get, Body, Param, Query } from '@nestjs/common';
import { GroqService } from './groq.service';

export class GenerateLandingPageDto {
  projectId: string;
  prompt: string;
  apiKey?: string;
}

@Controller('generator')
export class GroqController {
  constructor(private readonly groqService: GroqService) {}

  @Post('landing-page')
  async generateLandingPage(@Body() dto: GenerateLandingPageDto) {
    return this.groqService.generateLandingPage(dto.projectId, dto.prompt, dto.apiKey);
  }

  @Get('telemetry/:projectId')
  async getTelemetry(@Param('projectId') projectId: string) {
    return this.groqService.getTelemetry(projectId);
  }
}
