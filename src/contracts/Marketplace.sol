pragma solidity ^0.5.0;

contract Marketplace {
    string public name;
    uint public productCount = 0;
    mapping(uint => Product) public products;


    struct Product {
        uint id;
        string name;
        uint price;
        address owner;
        bool purchased;
    }

    event ProductCreated(uint id, string name, uint price, address owner, bool purchased);

    constructor() public {
        name = "Simsies Marketplace";
    }

    function createProduct(string memory _name, uint _price) public {
        // validation
        require(bytes(_name).length > 0);
        require(_price > 0);

        // creation logic
        productCount++;
        // create product
        products[productCount] = Product(productCount, _name, _price, msg.sender, false);

        // trigger event
        emit ProductCreated(productCount, _name, _price, msg.sender, false);
    }
}
