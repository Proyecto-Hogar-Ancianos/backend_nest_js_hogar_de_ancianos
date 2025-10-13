import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { SpecializedAreaService } from '../../application/services/specialized-area.service';

@Controller('specialized-areas')
export class SpecializedAreaController {
  constructor(private readonly areaService: SpecializedAreaService) {}

  @Get()
  getAll() {
    return this.areaService.getAll();
  }

  @Get(':id')
  getById(@Param('id') id: number) {
    return this.areaService.getById(id);
  }

  @Post()
  create(@Body() data: any) {
    return this.areaService.create(data);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() data: any) {
    return this.areaService.update(id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.areaService.delete(id);
  }
}
