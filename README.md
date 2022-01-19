# nft-minting

[![nft](https://img.shields.io/badge/cli-nft-brightgreen.svg)](https://github.com/Xact-Team/nft-cli)
[![Version](https://img.shields.io/npm/v/@xact-wallet-sdk/nft-cli.svg)](https://www.npmjs.com/package/@xact-wallet-sdk/nft-cli)
[![CircleCI](https://circleci.com/gh/Xact-Team/nft-cli/tree/main.svg?style=shield)](https://circleci.com/gh/Xact-Team/nft-cli/tree/main)
[![Downloads/week](https://img.shields.io/npm/dw/@xact-wallet-sdk/nft-cli.svg)](hhttps://www.npmjs.com/package/@xact-wallet-sdk/nft-cli)
[![License](https://img.shields.io/npm/l/@xact-wallet-sdk/nft-cli.svg)](https://github.com/Xact-Team/nft-cli/blob/main/LICENSE)

<!-- toc -->
* [nft-minting](#nft-minting)
* [Usage](#usage)
* [Config file](#config-file)
* [Example of how to use](#example-of-how-to-use)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g @xact-wallet-sdk/nft-cli
$ nft COMMAND
running command...
$ nft (--version)
@xact-wallet-sdk/nft-cli/0.0.5 darwin-x64 node-v12.18.3
$ nft --help [COMMAND]
USAGE
  $ nft COMMAND
...
```
<!-- usagestop -->

# Config file

The configuration file provided to mint command should looks like this:

```json
{
  "nftStorageApiKey": "YOUR_STORAGE_API_KEY",
  "hederaAccount": {
    "accountId": "0.0.12345678",
    "privateKey": "YOUR_PRIVATE_KEY",
    "environment": "testnet"
  },
  // Only needed for mint-multiple command
  "metadata": {
    // The following will be applied to the token
    "name": "TOKEN_NAME",
    "symbol": "TOKEN_SYMBOL",
        "customRoyaltyFee": [
      {
        "collectorAccountId": "0.0.12345678",
        "fallbackFee": 100,
        "numerator": 10,
        "denominator": 100
      }
    ],
    // The following will be applied to the nft
    "category": "Art",
    "creator": "TOKEN_CREATOR"
  }
}
```

To pass this file to your command use `--config` option.

# Example of how to use

1. Create a folder `mint` with a `config.json` file inside and your output folder from hashlips
2. Move into your folder `mint`
```shell
$ cd mint
```
3. Run `mint-multiple` command:
```shell
$ nft mint-multiple --from ./output
```

# Commands
<!-- commands -->
* [`nft commands`](#nft-commands)
* [`nft help [COMMAND]`](#nft-help-command)

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

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.1.9/src/commands/help.ts)_
<!-- commandsstop -->
