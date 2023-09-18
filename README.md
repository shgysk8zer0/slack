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

## About

`@shgysk8zer0/slack` is a JavaScript library that simplifies sending messages to Slack channels using [Incoming Webhooks](https://api.slack.com/messaging/webhooks). Whether you're building a web app, a Node.js script, or experimenting with Deno, this library makes Slack messaging a breeze.

**Why This Library?**

- **Simplicity**: Easily create Slack messages with user-friendly classes.
- **Error Help**: Get detailed error messages for easier debugging.
- **Versatile**: Use it in web apps, Node.js, and, to some extent, Deno.
- **Customizable**: Tailor it to your needs.

While this library is designed to be versatile, please note that full Deno support is not thoroughly tested. While many features work across different JavaScript environments, certain features, such as `SlackError.openInBlockKitBuilder()`, may not be fully compatible in Deno.

This library adapts to your JavaScript environment, making Slack messaging a snap without being tied to a specific platform.

**Important Note**: While this library can be used in both server-side (Node.js) and client-side (browser) JavaScript applications, it's strongly recommended to avoid exposing webhook URLs in client-side code. Exposing sensitive information like webhook URLs to the public can pose security risks. For client-side applications, consider using this library within a server-side context or handling the Slack integration server-side to keep your webhook URLs secure.

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
// Create a new SlackMessage instance with the specified webhook URL.
// This is set to `process.env.SLACK_WEBHOOK_URL` as a default in node
new SlackMessage(SLACK_WEBHOOK_URL)
	.add(
		// Add a header block with a plain text element.
		new SlackHeaderBlock(new SlackPlainTextElement('New Message from Slack Bot')),
		// Add a divider block to separate content.
		new SlackDividerBlock(),
		// Add an image block with a title and alt text.
		new SlackImageBlock('https://example.com/img.png', {
			title: new SlackPlainTextElement('Here is some image'),
			alt: 'Some image',
		}),
		// Add a section block with Markdown-formatted text.
		new SlackSectionBlock(
			new SlackMarkdownElement('This is some example <markdown | https://en.wikipedia.org/wiki/Markdown>'), {
				// Add a button accessory with a primary style and a URL.
				accessory: new SlackButtonElement('Open link!', {
					style: 'primary',
					url: 'https://example.com',
				}),
				// Add plain text fields and a Markdown field for email and phone number.
				fields: [
					new SlackPlainTextElement('Reply'),
					new SlackMarkdownElement('*Email:* <mailto:user@example.com | user@example.com>'),
					new SlackMarkdownElement('*Phone:* <tel:+1-555-555-5555 | 555-555-5555>'),
				],
			}
		)
	)
	// Send the constructed Slack message with a timeout of 5000 milliseconds using an AbortSignal.
	.send({ signal: AbortSignal.timeout(5000) })
	.then(() => {
		// Log a success message when the message is sent.
		console.log('Message sent');
	})
	// An error (a custom SlackError) was thrown
	.catch(async err => {
		console.error(err);
		
		// Status code of the response - 0 if there was a network error or aborted signal
		if (err.status !== 0) {
			// Open the message body in Slack's Block Kit Builder to show where any errors are.
			await err.openInBlockKitBuilder();
		}
	});
```

## To-Do (Work in Progress)

This package is a work in progress, and there are some areas that are still under development. Here's what's on the to-do list:

- [ ] Complete missing Block and Element types: Some Slack Blocks and Elements are not yet implemented in this package. We'll be adding support for additional types in future updates.
- [ ] Implement missing properties: While the core functionality is in place, there may be some properties on existing classes that are not yet fully implemented. We'll be working on adding support for these properties in upcoming releases.
- [ ] Additional documentation: While we provide documentation for the classes and methods introduced in this package, we'll also be adding `@see` links in comments to the relevant Slack API documentation on `api.slack.com` for reference.
