import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { SocialWorkReportService } from '../../application/services/social-work-report.service';

@Controller('social-work-reports')
export class SocialWorkReportController {
  constructor(private readonly socialWorkReportService: SocialWorkReportService) {}

  @Get()
  getAll() {
    return this.socialWorkReportService.getAll();
  }

  @Get(':id')
  getById(@Param('id') id: number) {
    return this.socialWorkReportService.getById(id);
  }

  @Post()
  create(@Body() data: any) {
    return this.socialWorkReportService.create(data);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() data: any) {
    return this.socialWorkReportService.update(id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.socialWorkReportService.delete(id);
  }
}
