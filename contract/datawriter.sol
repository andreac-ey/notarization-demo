pragma solidity >=0.4.22 <0.6.0;

contract DataWriter {

    address owner;
    string data;



    constructor () public {
        owner = msg.sender;
    }


    /* ******** Events ******** */
    event DataAdded(string);


    /* ******** Methods ******* */

    function setData(
        string memory _data
        ) public {
        require(bytes(_data).length > 0, 'Missing parameter');

        data = _data;
        emit DataAdded('Data stored in chain');
    }

    function getData() public view returns (string memory) {
        return (data);
    }


}