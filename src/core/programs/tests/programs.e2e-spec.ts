import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { ProgramsController } from '../infrastructure/controllers/programs.controller';

const mockProgramService = {
  findAll: jest.fn().mockResolvedValue([
    { id: 1, p_name: 'Health Workshop', p_type: 'workshop' },
  ]),
  findById: jest.fn().mockResolvedValue({ id: 1, p_name: 'Health Workshop', p_type: 'workshop' }),
  create: jest.fn().mockResolvedValue({ id: 2, p_name: 'New Program', p_type: 'course' }),
  update: jest.fn().mockResolvedValue({ id: 2, p_name: 'Updated Program', p_type: 'course' }),
  delete: jest.fn().mockResolvedValue(undefined),
  addParticipant: jest.fn().mockResolvedValue({ id: 1, pp_identification: '123', pp_name: 'John' }),
};

describe('ProgramsController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [ProgramsController],
      providers: [
        { provide: 'ProgramService', useValue: mockProgramService },
        { provide: ProgramsController, useValue: new ProgramsController(mockProgramService) },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/programs (GET)', () => {
    return request(app.getHttpServer())
      .get('/programs')
      .expect(200)
      .expect([
        { id: 1, p_name: 'Health Workshop', p_type: 'workshop' },
      ]);
  });

  it('/programs/:id (GET)', () => {
    return request(app.getHttpServer())
      .get('/programs/1')
      .expect(200)
      .expect({ id: 1, p_name: 'Health Workshop', p_type: 'workshop' });
  });

  it('/programs (POST)', () => {
    return request(app.getHttpServer())
      .post('/programs')
      .send({ p_name: 'New Program', p_type: 'course', p_start_date: '2025-01-01' })
      .expect(201)
      .expect({ id: 2, p_name: 'New Program', p_type: 'course' });
  });

  it('/programs/:id (PUT)', () => {
    return request(app.getHttpServer())
      .put('/programs/2')
      .send({ p_name: 'Updated Program', p_type: 'course', p_start_date: '2025-01-01' })
      .expect(200)
      .expect({ id: 2, p_name: 'Updated Program', p_type: 'course' });
  });

  it('/programs/:id (DELETE)', () => {
    return request(app.getHttpServer())
      .delete('/programs/2')
      .expect(200);
  });

  it('/programs/:id/participants (POST)', () => {
    return request(app.getHttpServer())
      .post('/programs/1/participants')
      .send({ pp_identification: '123', pp_name: 'John', pp_role: 'participant', id_program: 1 })
      .expect(201)
      .expect({ id: 1, pp_identification: '123', pp_name: 'John' });
  });

  afterAll(async () => {
    await app.close();
  });
});
