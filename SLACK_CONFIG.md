# How configure Slack Tokens

## Summary

- [How configure Slack Tokens](#how-configure-slack-tokens)
  - [Summary](#summary)
  - [Creating the Bot](#creating-the-bot)
  - [Adding to Workspace](#adding-to-workspace)
  - [Getting the token](#getting-the-token)
  - [Adding your bot in channel and copy the channel id](#adding-your-bot-in-channel-and-copy-the-channel-id)
    - [Finishing](#finishing)

## Creating the Bot

In [Slack Apps Dashboard](https://api.slack.com/apps) create a new app in Button "New App".

Then, select "From an app manifest" option, and past the json `app_manifest_example.json`, of this root of this project. And change the `<Your bot's display name>` string, by your but name, and can do anything.

Then, click in create.

## Adding to Workspace

In **Install your app** click in the button with the label "Install to Workspace".

![Installing Workspace](https://github.com/diogocezar/pizzaiolo/blob/main/.github/screenshots/Install_Workspace.png?raw=true)

After this, do this:

## Getting the token

Go to **OAuth & Permissions** screens and copy **Bot User OAuth Token**. Then this, you can past the token in `SLACK_TOKEN` env.

## Adding your bot in channel and copy the channel id

The last thing to do. Please, go to the channel you want to add the bot, and add her in "Integrations" path.

For copy the channel bot, just copy the link of url, or in desktop, click in copy, then copy link, in your channel.

The link is looks like: `https://app.slack.com/client/SLACK_WORKSPACE_ID/CHANNEL_ID`

Your channel is the last id, and copy her, and past in `SLACK_CHANNEL` env.

### Finishing

After this steps, you good to go, and can [return to main documentation](https://github.com/diogocezar/pizzaiolo/blob/main/README.md).
