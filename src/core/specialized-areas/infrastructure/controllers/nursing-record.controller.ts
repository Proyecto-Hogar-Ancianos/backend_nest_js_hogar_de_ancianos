import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { NursingRecordService } from '../../application/services/nursing-record.service';

@Controller('nursing-records')
export class NursingRecordController {
  constructor(private readonly nursingRecordService: NursingRecordService) {}

  @Get()
  getAll() {
    return this.nursingRecordService.getAll();
  }

  @Get(':id')
  getById(@Param('id') id: number) {
    return this.nursingRecordService.getById(id);
  }

  @Post()
  create(@Body() data: any) {
    return this.nursingRecordService.create(data);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() data: any) {
    return this.nursingRecordService.update(id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.nursingRecordService.delete(id);
  }
}
