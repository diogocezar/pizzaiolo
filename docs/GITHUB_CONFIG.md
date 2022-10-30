# How configure GitHub WebHooks

## Summary

- [Creating the Webhooks](#creating-the-webhooks)
  - [Finishing](#finishing)

## Creating the Webhooks

In your github organization page, go to settings, for example: `https://github.com/organizations/<YOUR_ORGANIZATION>/settings/profile`. Then, go to `Code, planning, and automation` session, and click in `Webhooks`.

In Webhooks Page, click in `Add Webhook` button, in Payload URL, put the url of uploaded application (for do this step, you need already upped your pizzaiolo machine).

In Content type select `application/json` and in Secret put the same secret of you put in your `GITHUB_WEBHOOK_SECRET` env.

Select `Send me everything` in `Which events would you like to trigger this webhook?` session, and finally click in `Add webhook`.

If the `active` is not selected by default, select it.

### Finishing

After this your Github Webhooks is configured and you good to go, and can [return to main documentation](https://github.com/diogocezar/pizzaiolo/blob/main/README.md).
