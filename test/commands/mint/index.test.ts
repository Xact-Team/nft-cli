import { expect, test } from '@oclif/test';

describe('mint', () => {
  test
    .stdout()
    .command([
      'mint',
      '--config=./samples/config.json',
      '--from=./samples/nfts',
    ])
    .it('runs mint command', (ctx) => {
      expect(ctx.stdout).to.contain(
        "Can't find any paired file in the provided folder.",
      );
    });
});
