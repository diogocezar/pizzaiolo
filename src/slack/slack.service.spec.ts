import { Test, TestingModule } from '@nestjs/testing'
import { SlackApi } from 'src/config/api/slack.api'
import { SlackService } from './slack.service'

describe('SlackService', () => {
  let service: SlackService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SlackService,
        {
          provide: SlackApi,
          useValue: {
            post: jest.fn(() =>
              Promise.resolve({
                data: {
                  ok: true,
                },
              })
            ),
          },
        },
      ],
    }).compile()

    service = module.get<SlackService>(SlackService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should send a message to slack', async () => {
    const message = {
      text: 'Hello World',
    }
    const response = await service.sendMessage(message)

    expect(response).toEqual({ ok: true })
  })

  it('should add a reaction to a message', async () => {
    const reaction = {
      name: 'thumbsup',
    }
    const response = await service.addReaction(reaction)

    expect(response).toBeUndefined()
  })
})
