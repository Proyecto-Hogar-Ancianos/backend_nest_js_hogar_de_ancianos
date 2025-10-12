import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { PermissionsController } from '../infrastructure/controllers/permissions.controller';

const mockPermService = {
  findAll: jest.fn().mockResolvedValue([{ id: 1, p_name: 'create_user' }]),
  create: jest.fn().mockResolvedValue({ id: 2, p_name: 'delete_user', id_role: 1 }),
};

describe('PermissionsController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [PermissionsController],
      providers: [
        { provide: 'PermService', useValue: mockPermService },
        { provide: PermissionsController, useValue: new PermissionsController(mockPermService) },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/permissions (GET)', () => {
    return request(app.getHttpServer())
      .get('/permissions')
      .expect(200)
      .expect([{ id: 1, p_name: 'create_user' }]);
  });

  it('/permissions (POST)', () => {
    return request(app.getHttpServer())
      .post('/permissions')
      .send({ p_name: 'delete_user', id_role: 1 })
      .expect(201)
      .expect({ id: 2, p_name: 'delete_user', id_role: 1 });
  });

  afterAll(async () => {
    await app.close();
  });
});
