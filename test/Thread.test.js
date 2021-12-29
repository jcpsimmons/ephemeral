const { assert } = require('chai');

require('chai').use(require('chai-as-promised')).should();

const Thread = artifacts.require('./Thread.sol');

contract('Thread', ([deployer, poster, payer]) => {
  let thread;

  before(async () => {
    thread = await Thread.deployed();
  });

  describe('deployment', async () => {
    it('deploys successfully', async () => {
      const address = await thread.address;
      assert.notEqual(address, 0x0);
      assert.notEqual(address, '');
      assert.notEqual(address, null);
      assert.notEqual(address, undefined);
    });

    it('has a name', async () => {
      const name = await thread.name();
      assert.equal(name, 'Ephemeral Main Thread');
    });
  });

  describe('posting', async () => {
    let result, replyCount;

    before(async () => {
      result = await thread.addReply('This is the test reply!', {
        from: poster,
      });
      replyCount = await thread.replyCount();
    });

    it('creates reply', async () => {
      assert.equal(replyCount, 1);
      const event = result.logs[0].args;
      assert.equal(
        event.id.toNumber(),
        replyCount.toNumber(),
        'reply count is correct'
      );
      assert.equal(event.address, poster.address, 'address is correct');
      assert.equal(
        event.content,
        'This is the test reply!',
        'content is correct'
      );
      assert.equal(
        event.weiEarned,
        web3.utils.toWei('0', 'Ether'),
        'weiEarned is correct'
      );

      // failure states
      await thread.addReply('x'.repeat(1000), {
        from: poster,
      }).should.be.rejected;
    });
  });

  describe('paying', async () => {
    it('pays OP and I', async () => {
      let payerBalanceBefore = await web3.eth.getBalance(payer);
      payerBalanceBefore = web3.utils.toWei(payerBalanceBefore, 'Ether');
      let posterBalanceBefore = await web3.eth.getBalance(poster);
      posterBalanceBefore = web3.utils.toWei(posterBalanceBefore, 'Ether');

      const value = web3.utils.toWei('.5', 'Ether');
      const result = await thread.payPoster(poster, { from: payer, value });

      const [replyFundedEvent, transactionFeeEvent] = result.logs;

      assert.equal(
        replyFundedEvent.args.to,
        poster,
        'poster (paid) addy is correct'
      );
      assert.equal(
        replyFundedEvent.args.weiEarned,
        value * 0.95,
        'value paid is correct'
      );

      assert.equal(
        transactionFeeEvent.args.to,
        '0x55fAaa5Ff75f6387e066DdA8EA587Ce8801c9BD5',
        'my transaction fee addy is correct'
      );
      assert.equal(
        transactionFeeEvent.args.weiEarned,
        value * 0.05,
        'transaction fee amt is correct'
      );

      let payerBalanceAfter = await web3.eth.getBalance(payer);
      payerBalanceAfter = web3.utils.toWei(payerBalanceAfter, 'Ether');
      assert.isTrue(
        payerBalanceAfter < payerBalanceBefore,
        'payer balance decreased'
      );

      let posterBalanceAfter = await web3.eth.getBalance(poster);
      posterBalanceAfter = web3.utils.toWei(posterBalanceAfter, 'Ether');
      assert.isTrue(
        posterBalanceAfter > posterBalanceBefore,
        'poster balance increased'
      );
    });
  });
});
