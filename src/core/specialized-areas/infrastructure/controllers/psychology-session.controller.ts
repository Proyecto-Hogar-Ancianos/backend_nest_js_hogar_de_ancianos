import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { PsychologySessionService } from '../../application/services/psychology-session.service';

@Controller('psychology-sessions')
export class PsychologySessionController {
  constructor(private readonly psychologyService: PsychologySessionService) {}

  @Get()
  getAll() {
    return this.psychologyService.getAll();
  }

  @Get(':id')
  getById(@Param('id') id: number) {
    return this.psychologyService.getById(id);
  }

  @Post()
  create(@Body() data: any) {
    return this.psychologyService.create(data);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() data: any) {
    return this.psychologyService.update(id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.psychologyService.delete(id);
  }
}
