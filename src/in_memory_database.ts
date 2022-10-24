import { MessageData } from 'src/types/message'

class DataBase {
  slackMessages: MessageData[] = []

  constructor() {
    this.slackMessages = []
  }

  addMessage(message: MessageData) {
    this.slackMessages.push(message)
  }

  updateMessage(message: MessageData) {
    const index = this.slackMessages.findIndex(
      (msg) => msg.pullRequestUrl === message.pullRequestUrl
    )

    this.slackMessages[index] = message
  }

  getMessages(): MessageData[] {
    return this.slackMessages
  }

  getMessageByPullRequestUrl(pullRequestUrl: string): MessageData {
    return this.slackMessages.find(
      (message) => message.pullRequestUrl === pullRequestUrl
    )
  }
}

export default new DataBase()
