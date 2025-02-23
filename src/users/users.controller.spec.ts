import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { UsersController } from './users.controller';
import {  Model } from 'mongoose';


describe('UsersController', () => {
  let controller: UsersController
  let service: UsersService;

  beforeEach(() => {
    service = new UsersService(new Model<User>);
    controller = new UsersController(service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe("findAll", () => {
    it('Should return all users', async () => {
      jest.spyOn(service, "findAll").mockImplementation(async () => []);

      expect(await controller.findAll()).toBe([])
    })
  });
})
