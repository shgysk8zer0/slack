# `@shgysk8zer0/slack`

An npm package for sending messages in Slack using [Incoming Webhooks](https://api.slack.com/messaging/webhooks)

## Installation

### NPM

```bash
npm i @shgysk8zer0/slack
```

### ESModule / unpkg

This package also works in browsers and can be imported from [unpkg.com](https://unpkg.com/browse/@shgysk8zer0/slack)
from `https://unpkg.com/@shgys8zer0/slack/*`.

## Getting Started

This package uses Slack's Incoming Webhooks, which requires a little setup.

1. [Create a Slack App](https://api.slack.com/apps/new)
2. [Enable Incoming Webhooks](https://api.slack.com/apps)
3. Create an Incoming Webhook

See [Sending messages using Incoming Webhooks | Slack](https://api.slack.com/messaging/webhooks) for full details.

## Environment Setup

In a Node.js environment, you can set the SLACK_WEBHOOK_URL environment variable in your .env file or directly in your environment to avoid passing the URL to the constructor every time.

```bash
# .env file
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/xxxxxxxxx/xxxxxxxxxxx/xxxxxxxx
```

When using this package in a browser, you'll need to provide the webhook URL directly when constructing the SlackMessage instance.

## Example

### Import the classes

#### Option 1 - Import from Individual Class Files

```js
import { SlackMessage } from '@shgysk8zer0/slack/message.js';
import { SlackHeaderBlock } from '@shgysk8zer0/slack/block/header.js';
import { SlackPlainTextElement } from '@shgysk8zer0/slack/element/plain-text.js';
import { SlackMarkdownElement } from '@shgysk8zer0/slack/element/markdown.js';
import { SlackImageBlock } from '@shgysk8zer0/slack/block/image.js';
import { SlackDividerBlock } from '@shgysk8zer0/slack/block/divider.js';
import { SlackButtonElement } from '@shgysk8zer0/slack/element/button.js';
import { SlackSectionBlock } from '@shgysk8zer0/slack/block/section.js';
import { SlackError } from '@shgysk8zer0/slack/error.js';
```

#### Option 2 - Import the Entire Package

```js
import {
  SlackHeader,
  SlackPlainText,
  SlackMarkdownElement,
  SlackImageBlock,
  SlackDividerBlock,
  SlackButtonElement,
  SlackSectionBlock,
  SlackError,
} from '@shgysk8zer0/slack';
```

### Build and Send the Message

```
// This is set to `process.env.SLACK_WEBHOOK_URL` as a default in node
new SlackMessage(SLACK_WEBHOOK_URL).add(
	new SlackHeaderBlock(new SlackPlainTextElement('New Message on from Slack Bot')),
	new SlackDividerBlock(),
	new SlackImageBlock('https://example.com/img.png', {
		title: new SlackPlainTextElement('Here is some image'),
		alt: 'Some image',
	}),
	new SlackSectionBlock(
		new SlackMarkdownElement('This is some example <markdown | https://en.wikipedia.org/wiki/Markdown>'),
		{
			accessory: new SlackButtonElement('Open link!', {
				style: 'primary',
				url: 'https://example.com',
			}),
			fields: [
				new SlackPlainTextElement('Reply'),
				new SlackMarkdownElement('*Email:* <mailto:user@example.com | user@example.com>'),
				new SlackMarkdownElement('*Phone:* <tel:+1-555-555-5555 | 555-555-5555>'),
			]
		},
	),
).send().then(
	() => console.log('Message sent'),
	async err => {
		console.error(err);
		await err.openInBlockKitBuilder();
	}
);
```
