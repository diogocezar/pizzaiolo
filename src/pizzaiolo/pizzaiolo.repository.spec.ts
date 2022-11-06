import { Test, TestingModule } from '@nestjs/testing'
import { PrismaService } from 'src/common/database/prisma/prisma.service'
import { prismaMock } from 'src/mocks/prisma/singleton'
import { pullRequestMock } from 'src/mocks/pull_request.mock'
import { PizzaioloRepository } from 'src/pizzaiolo/pizzaiolo.repository'

describe('PizzaioloRepository', () => {
  let service: PizzaioloRepository

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PizzaioloRepository,
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
      ],
    }).compile()

    service = module.get<PizzaioloRepository>(PizzaioloRepository)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should save a event', async () => {
    const dbMock = {
      id: 1,
      action: 'opened',
      pullRequestId: 1,
      createdAt: new Date(0),
      updatedAt: new Date(0),
      userId: 1,
    }
    prismaMock.events.create.mockResolvedValue(dbMock)

    const event = service.save({
      action: 'opened',
      pull_request: pullRequestMock.pull_request,
      user: pullRequestMock.sender,
    })
    return expect(event).resolves.toEqual(dbMock)
  })

  it('should save a message', async () => {
    const dbMock = {
      id: 1,
      ts: '123456789',
      pullRequestId: 1,
      createdAt: new Date(0),
      updatedAt: new Date(0),
    }
    prismaMock.message.create.mockResolvedValue(dbMock)

    const event = service.saveMessage({
      timestamp: '123456789',
      pull_request: pullRequestMock.pull_request,
      url: pullRequestMock.pull_request.html_url,
    })
    return expect(event).resolves.toEqual(dbMock)
  })

  it('should find how many times events a pull request has', async () => {
    prismaMock.events.count.mockResolvedValue(1)

    const event = service.findSubmittedPullRequest(
      pullRequestMock.pull_request.url
    )
    return expect(event).resolves.toEqual(1)
  })

  it("should find message timestamp by pull request's url", async () => {
    prismaMock.message.findFirst.mockResolvedValue({
      ts: '123456789',
      createdAt: new Date(0),
      updatedAt: new Date(0),
      id: 1,
      pullRequestId: 1,
    })

    const event = service.findMessageTimeStamp(
      pullRequestMock.pull_request.html_url
    )
    return expect(event).resolves.toEqual('123456789')
  })
})
