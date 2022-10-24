import { Test, TestingModule } from '@nestjs/testing'
import { PizzaioloService } from './pizzaiolo.service'

describe('PizzaioloService', () => {
  let service: PizzaioloService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PizzaioloService],
    }).compile()

    service = module.get<PizzaioloService>(PizzaioloService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
