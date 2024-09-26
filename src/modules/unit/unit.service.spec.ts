/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { UnitService } from './unit.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Unit } from './schemas/unit.schema';

describe('UnitService', () => {
  let service: UnitService;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let model: Model<Unit>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UnitService,
        {
          provide: getModelToken('unit'),
          useValue: {
            // Mocking methods of the model
            find: jest.fn(),
            findById: jest.fn(),
            findByIdAndUpdate: jest.fn(),
            findByIdAndDelete: jest.fn(),
            save: jest.fn(),
            exec: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UnitService>(UnitService);
    model = module.get<Model<Unit>>(getModelToken('unit'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
