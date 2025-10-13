import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { PsychologySessionService } from '../services/psychology-session.service';

@Controller('psychology-sessions')
export class PsychologySessionController {
  constructor(private readonly psychologySessionService: PsychologySessionService) { }

  @Get()
  getAll() {
    return this.psychologySessionService.getAll();
  }

  @Get(':id')
  getById(@Param('id') id: number) {
    return this.psychologySessionService.getById(id);
  }

  @Post()
  create(@Body() data: any) {
    return this.psychologySessionService.create(data);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() data: any) {
    return this.psychologySessionService.update(id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.psychologySessionService.delete(id);
  }
}
