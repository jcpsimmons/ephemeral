pragma solidity ^0.5.0;

contract Thread {
    string public name;
    address payable public myPublicKey = 0xd501eD3C3626402FA5a381D844b54a265BFF0108;
    uint public replyCount = 0;
    mapping(uint => Reply) public replies;

    struct Reply {
        uint id;
        address payable poster;
        string content;
        uint weiEarned;
    }

    event ReplyAdded(
        uint id,
        address payable poster,
        string content,
        uint weiEarned
    );

    event ReplyFunded(
        address payable to,
        uint weiEarned
    ); 

    event TransactionFeeProcessed(
        address payable to,
        uint weiEarned
    );

    constructor() public {
        name = "Ephemeral Main Thread";
    }

    function addReply(string memory _content) public {
        // require content of length...
        require(bytes(_content).length > 0 && bytes(_content).length <= 999);

        // reset to 0 if reply count too high
        if(replyCount == 999999) {
            replyCount = 0;
        }
        replyCount ++;

        // Create the reply - overwriting as necessary
        replies[replyCount] = Reply(replyCount, msg.sender, _content, 0);
        // Trigger an event
        emit ReplyAdded(replyCount, msg.sender, _content, 0);
    }

    function payPoster(address payable _to) public payable {
        // Require that there is enough Ether in the transaction
        require(msg.value > 0);

        // can I show Wei earned somehow but associate it with the person's ID

        // Deposit my transaction fee
        address(myPublicKey).transfer((msg.value / 100) * 5);

        // Pay the seller by sending them Ether
        address(_to).transfer((msg.value / 100) * 95);

        // Trigger an event
        emit ReplyFunded(_to, (msg.value / 100) * 95);
        emit TransactionFeeProcessed(myPublicKey, (msg.value / 100) * 5);
    }
}
