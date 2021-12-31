import { expect, test } from '@oclif/test';

describe('mint multiple', () => {
  test
    .stdout()
    .command([
      'mint-multiple',
      '--config=./samples/config.json',
      '--from=./samples/nfts',
    ])
    .it('runs mint multiple command', (ctx) => {
      expect(ctx.stdout).to.contain(
        "Can't find any paired file in the provided folder.",
      );
    });
});
