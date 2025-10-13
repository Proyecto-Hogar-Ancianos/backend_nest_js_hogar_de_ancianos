import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { SpecializedAppointmentService } from '../../application/services/specialized-appointment.service';

@Controller('specialized-appointments')
export class SpecializedAppointmentController {
  constructor(private readonly appointmentService: SpecializedAppointmentService) {}

  @Get()
  getAll() {
    return this.appointmentService.getAll();
  }

  @Get(':id')
  getById(@Param('id') id: number) {
    return this.appointmentService.getById(id);
  }

  @Post()
  create(@Body() data: any) {
    return this.appointmentService.create(data);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() data: any) {
    return this.appointmentService.update(id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.appointmentService.delete(id);
  }
}
