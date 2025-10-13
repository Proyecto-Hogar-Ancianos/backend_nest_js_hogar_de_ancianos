import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { PhysiotherapySessionService } from '../../application/services/physiotherapy-session.service';

@Controller('physiotherapy-sessions')
export class PhysiotherapySessionController {
  constructor(private readonly physiotherapyService: PhysiotherapySessionService) {}

  @Get()
  getAll() {
    return this.physiotherapyService.getAll();
  }

  @Get(':id')
  getById(@Param('id') id: number) {
    return this.physiotherapyService.getById(id);
  }

  @Post()
  create(@Body() data: any) {
    return this.physiotherapyService.create(data);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() data: any) {
    return this.physiotherapyService.update(id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.physiotherapyService.delete(id);
  }
}
