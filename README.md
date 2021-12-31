# nft-minting

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://github.com/Xact-Team/nft-cli)
[![Version](https://img.shields.io/npm/v/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![CircleCI](https://circleci.com/gh/oclif/hello-world/tree/main.svg?style=shield)](https://circleci.com/gh/oclif/hello-world/tree/main)
[![Downloads/week](https://img.shields.io/npm/dw/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![License](https://img.shields.io/npm/l/oclif-hello-world.svg)](https://github.com/oclif/hello-world/blob/main/package.json)

<!-- toc -->
* [nft-minting](#nft-minting)
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g nft-cli
$ nft COMMAND
running command...
$ nft (--version)
nft-cli/0.0.1 darwin-arm64 node-v14.18.1
$ nft --help [COMMAND]
USAGE
  $ nft COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`nft commands`](#nft-commands)
* [`nft help [COMMAND]`](#nft-help-command)
* [`nft mint`](#nft-mint)

## `nft commands`

list all the commands

```
USAGE
  $ nft commands [-h] [-j] [--hidden] [--columns <value> | -x] [--sort <value>] [--filter <value>] [--output
    csv|json|yaml |  | [--csv | --no-truncate]] [--no-header | ]

FLAGS
  -h, --help         Show CLI help.
  -j, --json         display unfiltered api data in json format
  -x, --extended     show extra columns
  --columns=<value>  only show provided columns (comma-separated)
  --csv              output is csv format [alias: --output=csv]
  --filter=<value>   filter property by partial string matching, ex: name=foo
  --hidden           show hidden commands
  --no-header        hide table header from output
  --no-truncate      do not truncate output to fit screen
  --output=<option>  output in a more machine friendly format
                     <options: csv|json|yaml>
  --sort=<value>     property to sort by (prepend '-' for descending)

DESCRIPTION
  list all the commands
```

_See code: [@oclif/plugin-commands](https://github.com/oclif/plugin-commands/blob/v2.0.1/src/commands/commands.ts)_

## `nft help [COMMAND]`

Display help for nft.

```
USAGE
  $ nft help [COMMAND] [-n]

ARGUMENTS
  COMMAND  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for nft.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.1.10/src/commands/help.ts)_

## `nft mint`

Mint your NFT's

```
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

_See code: [dist/commands/mint/index.ts](https://github.com/git@github.com:Xact-Team/nft-cli.git/nft-cli/blob/v0.0.1/dist/commands/mint/index.ts)_
<!-- commandsstop -->
