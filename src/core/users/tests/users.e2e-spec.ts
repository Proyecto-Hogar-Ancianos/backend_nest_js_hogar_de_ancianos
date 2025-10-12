import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { UsersController } from '../infrastructure/controllers/users.controller';
import { UsersService } from '../application/services/users.service';

// Mock UsersService for isolated tests
const mockUsersService = {
  findAll: jest.fn().mockResolvedValue([]),
  findById: jest.fn().mockResolvedValue({}),
  create: jest.fn().mockResolvedValue({ id: 1, identification: 'ID123', name: 'Test', fLastName: 'User', sLastName: null, u_email: 'test@test.com', u_email_verified: false, u_password: 'hashed', u_is_active: true, u_token: null, create_at: new Date().toISOString(), role_id: 1 }),
  update: jest.fn().mockResolvedValue({ id: 1, identification: 'ID123', name: 'Test', fLastName: 'User', sLastName: null, u_email: 'test@test.com', u_email_verified: false, u_password: 'hashed', u_is_active: true, u_token: null, create_at: new Date().toISOString(), role_id: 1, fullName: 'Test User Updated' }),
  delete: jest.fn().mockResolvedValue(undefined),
};

describe('UsersController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        { provide: UsersService, useValue: mockUsersService },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/users (GET)', () => {
    return request(app.getHttpServer())
      .get('/users')
      .expect(200)
      .expect([]);
  });

  it('/users/:id (GET)', () => {
    return request(app.getHttpServer())
      .get('/users/1')
      .expect(200)
      .then(res => {
        expect(res.body).toMatchObject({
          u_email_verified: false,
          u_is_active: true,
          create_at: expect.any(String),
          role_id: null,
        });
      });
  });

  it('/users (POST)', () => {
    return request(app.getHttpServer())
      .post('/users')
      .send({ u_email: 'test@test.com', u_password: '123456', role_id: 1, u_name: 'Test', u_f_last_name: 'User', u_identification: 'ID123' })
      .expect(201)
      .then(res => {
        expect(res.body).toMatchObject({
          id: 1,
          identification: 'ID123',
          name: 'Test',
          fLastName: 'User',
          u_email: 'test@test.com',
          u_is_active: true,
          create_at: expect.any(String),
          role_id: 1,
        });
      });
  });

  it('/users/:id (PUT)', () => {
    return request(app.getHttpServer())
      .put('/users/1')
      .send({ u_name: 'Test Updated' })
      .expect(200)
      .then(res => {
        expect(res.body).toMatchObject({
          id: 1,
          identification: 'ID123',
          name: 'Test',
          fLastName: 'User',
          u_email: 'test@test.com',
          u_is_active: true,
          create_at: expect.any(String),
          role_id: 1,
        });
      });
  });

  it('/users/:id (DELETE)', () => {
    return request(app.getHttpServer())
      .delete('/users/1')
      .expect(200)
      .expect('');
  });

  afterAll(async () => {
    await app.close();
  });
});
