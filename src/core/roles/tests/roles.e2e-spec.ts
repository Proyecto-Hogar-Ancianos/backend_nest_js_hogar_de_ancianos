import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { RolesController } from '../infrastructure/controllers/roles.controller';

const mockRoleService = {
  findAll: jest.fn().mockResolvedValue([{ id: 1, r_name: 'admin' }]),
  create: jest.fn().mockResolvedValue({ id: 2, r_name: 'new-role' }),
};

describe('RolesController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [RolesController],
      providers: [
        { provide: 'RoleService', useValue: mockRoleService },
        { provide: RolesController, useValue: new RolesController(mockRoleService) },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/roles (GET)', () => {
    return request(app.getHttpServer())
      .get('/roles')
      .expect(200)
      .expect([{ id: 1, r_name: 'admin' }]);
  });

  it('/roles (POST)', () => {
    return request(app.getHttpServer())
      .post('/roles')
      .send({ r_name: 'new-role' })
      .expect(201)
      .expect({ id: 2, r_name: 'new-role' });
  });

  afterAll(async () => {
    await app.close();
  });
});
