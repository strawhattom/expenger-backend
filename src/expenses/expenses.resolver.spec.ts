import { Test, TestingModule } from '@nestjs/testing';
import { ExpenseResolver } from './expenses.resolver';
import { ExpenseService } from './expenses.service';

describe('ExpenseResolver', () => {
  let resolver: ExpenseResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExpenseResolver, ExpenseService],
    }).compile();

    resolver = module.get<ExpenseResolver>(ExpenseResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
