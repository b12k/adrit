# AutoScout24 development

This repository is aimed to be a centralized place for development information
at AutoScout24.

It consists of two major parts:

- `./sync`
- `./docs`

## Sync

Files and subfolders are automatically syncronized with organization
repositories. Syncronization happens when `sync/*` branch is merged to `master`.
Configuration of "what and where" is stored in `.github/sync.yml`.

## Docs

This section contain markdown files which contain documentation and decision
records related to all aspects of development at AutoScout24.

Table of contents (`README.md` in the root of repository) is automatically
generated on commit using `npm run create:toc`.

Files can be grouped into folders to form chapters.

All markdown files are linted with `markdownlint`.

To create Decision Record or change its status use `npm run adr`.

## Working with repository

- Clone repository
- Install dependencies `npm i`
- Branch using branch naming convention

  _**Branches not matching the convention will be rejected**_
  - `docs/*` for changes in documentation and decision records
  - `sync/*` for changes in syncable files
  - `misc/*` for changes not related to documentation of cross-organization
  file syncronization
- Make chages
  - Create Decision Record `npm run create:adr`
  - Create your own `.md` file or folder in docs repository
  - Add / Edit / Remove files in `./sync` folder
- Commit your changes using conventional commits convention
- Push to remote
- Create a PR
- Get your PR reviewed and merged
