import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe("findAll", () => {
    it('Should return all users', async () => {
      jest.spyOn(service, "findAll").mockImplementation(async () => []);

      expect(await service.findAll()).toBe([])
    })
  });
})
