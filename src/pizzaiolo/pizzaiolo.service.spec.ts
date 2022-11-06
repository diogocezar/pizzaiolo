import { Test, TestingModule } from '@nestjs/testing'
import { PrismaService } from 'src/common/database/prisma/prisma.service'
import { prismaMock } from 'src/mocks/prisma/singleton'
import { pullRequestMock } from 'src/mocks/pull_request.mock'
import { PizzaioloRepository } from 'src/pizzaiolo/pizzaiolo.repository'
import { SlackService } from 'src/slack/slack.service'
import { PizzaioloService } from './pizzaiolo.service'

describe('PizzaioloService', () => {
  let service: PizzaioloService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PizzaioloService,
        PizzaioloRepository,
        {
          provide: PrismaService,
          useValue: {
            saveMessage: jest.fn(),
            findMessageTimeStamp: jest.fn(),
            findSubmittedPullRequest: jest.fn(),
          },
        },
        {
          provide: SlackService,
          useValue: {
            sendMessage: jest.fn(),
            addReaction: jest.fn(),
          },
        },
      ],
    }).compile()

    service = module.get<PizzaioloService>(PizzaioloService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should send a message to slack and save it when a pull request is opened', async () => {
    const res = service.openedPullRequest({
      user: pullRequestMock.sender,
      title: pullRequestMock.pull_request.title,
      created_at: pullRequestMock.pull_request.created_at,
      html_url: pullRequestMock.pull_request.html_url,
      pull_request: pullRequestMock.pull_request,
      merged: false,
      draft: false,
    })
    expect(res).resolves.toBeUndefined()
  })

  it('should send a message to slack and save it when a pull request is closed', async () => {
    const res = service.closedPullRequest({
      user: pullRequestMock.sender,
      title: pullRequestMock.pull_request.title,
      created_at: pullRequestMock.pull_request.created_at,
      html_url: pullRequestMock.pull_request.html_url,
      pull_request: pullRequestMock.pull_request,
      merged: false,
      draft: false,
    })
    expect(res).resolves.toBeUndefined()
  })

  it('should send a message to slack and save it when a pull request is submitted', async () => {
    const res = service.submittedPullRequest({
      user: pullRequestMock.sender,
      title: pullRequestMock.pull_request.title,
      created_at: pullRequestMock.pull_request.created_at,
      html_url: pullRequestMock.pull_request.html_url,
      pull_request: pullRequestMock.pull_request,
      merged: false,
      draft: false,
    })
    expect(res).resolves.toBeUndefined()
  })

  it('should send a message to slack and save it when a pull request is created', async () => {
    const res = service.createdPullRequest({
      user: pullRequestMock.sender,
      title: pullRequestMock.pull_request.title,
      created_at: pullRequestMock.pull_request.created_at,
      html_url: pullRequestMock.pull_request.html_url,
      pull_request: pullRequestMock.pull_request,
      merged: false,
      draft: false,
    })
    expect(res).resolves.toBeUndefined()
  })

  it('should send a message to slack and save it when a pull request is resolved', async () => {
    const res = service.resolvedPullRequest({
      user: pullRequestMock.sender,
      title: pullRequestMock.pull_request.title,
      created_at: pullRequestMock.pull_request.created_at,
      html_url: pullRequestMock.pull_request.html_url,
      pull_request: pullRequestMock.pull_request,
      merged: false,
      draft: false,
    })
    expect(res).resolves.toBeUndefined()
  })

  it('should send a message to slack and save it when a pull request is unresolved', async () => {
    const res = service.unresolvedPullRequest({
      user: pullRequestMock.sender,
      title: pullRequestMock.pull_request.title,
      created_at: pullRequestMock.pull_request.created_at,
      html_url: pullRequestMock.pull_request.html_url,
      pull_request: pullRequestMock.pull_request,
      merged: false,
      draft: false,
    })
    expect(res).resolves.toBeUndefined()
  })
})
