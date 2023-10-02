# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [v0.0.5] - 2023-10-01

### Added
- Add `@shgysk8zer0/consts` and `@shgysk8zer0/http`
- Add CommonJS versions of all modules

### Changed
- Update `exports`

## [v0.0.4] - 2023-09-19

### Added
- Add keywords to `package.json`
- Add badges to `README.md`

### Fixed
- Fixed bad logic determining success of adding elements/fields [#6](https://github.com/shgysk8zer0/slack/issues/6
)

## [v0.0.3] - 2023-09-19

### Added
- Add `SlackActionsBlock`
- Add `SlackContextBlock`
- Add `SlackInputBlock`
- Created new `SlackInteractiveElement` as base class for buttons & inputs
- Add `SlackInputElement` with some types (text, url, email, number)

### Changed
- `SlackButtonElement` now extends `SlackInteractiveElement`
- `SlackSectionBlock.accessory` must now be a `SlackInteractiveElement`

### Fixed
- Fixed default button type to be `undefined` instead of `'default'`

## [v0.0.2] - 2023-09-28

### Added
- Add `createSlack*` alternatives to `new Slack*`

### Fixed
- Fix missing lang on code block for example in README

## [v0.0.1] - 2023-09-18

Initial Release
