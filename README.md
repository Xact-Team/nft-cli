# nft-minting

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://github.com/Xact-Team/nft-cli)
[![Version](https://img.shields.io/npm/v/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![CircleCI](https://circleci.com/gh/oclif/hello-world/tree/main.svg?style=shield)](https://circleci.com/gh/oclif/hello-world/tree/main)
[![Downloads/week](https://img.shields.io/npm/dw/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![License](https://img.shields.io/npm/l/oclif-hello-world.svg)](https://github.com/oclif/hello-world/blob/main/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```shell
$ yarn global add nft-cli # or npm install -g nft-cli
$ nft COMMAND
running command...
$ nft (--version)
nft-cli/0.0.0 darwin-arm64 node-v14.18.1
$ nft --help [COMMAND]
USAGE
  $ nft COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`nft help [COMMAND]`](#nft-help-command)
* [`nft commands`](#nft-commands)
* [`nft mint`](#nft-mint)

## `nft help [COMMAND]`

Display help for one command.

```shell
USAGE
  $ nft help [COMMAND] [-n]

ARGUMENTS
  COMMAND  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for nft.
```

## `nft commands`

List all available commmands

```shell
 Command  Summary
 ──────── ─────────────────────
 commands list all the commands
 help     Display help for nft.
 mint     Mint your NFT's
```

## `nft mint`

Allow you to mint all your NFT's from a folder

```shell
Mint your NFT's

USAGE
  $ nft mint -f <value> [-c <value>]

FLAGS
  -c, --config=<value>  [default: /Users/magrin_j/Work/Xact/nft-cli/config.json] Path of your config file
  -f, --from=<value>    (required) Path from which you want to create your NFT's

DESCRIPTION
  Mint your NFT's

EXAMPLES
  $ nft mint -c sample.config.json -f ~/Downloads/nfts
        Checking your configuration...
        Checking if the path is a directory...
        Reading the content of all the paired files...
        Running minting of your directory...
        ...
```
<!-- commandsstop -->
