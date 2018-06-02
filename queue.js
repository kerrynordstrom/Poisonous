'use strict';

const util = require('util');

// -------- LinkedList Class declaration ----------
class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.nodeCount = 0;
  }
  //Returns length of linked list
  get listLength() {
    return this.nodeCount;
  }


  addNodeAsFirst(value) {
    // Create a new Node
    const node = {
      value: value,
      next: null
    }

    //Step 1: Save a reference to the first node
    const holdPlz = this.head;

    //Step 2: the new node to the head reference
    this.head = node;

    //Step 3: Add our held reference as the second node
    this.head.next = holdPlz;

    //Step 4a: Increment node count
    this.nodeCount++;

    //Step 4b: If this is the first node, assign it to tail as well
    if (this.nodeCount === 1) {
      // If first node, 
      // point tail to it as well
      this.tail = this.head;
    }
  }

  //Creates a new node and adds it as the last member of the linked list
  addNodeAsLast(value) {
    // Creates a new Node
    const node = {
      value: value,
      next: null
    }
    //Step 1: Assign node to head if it is the first in the linked list
    if (this.nodeCount === 0) {
      //Step 2a: If it is not the first node, assign link to last node
      this.head = node;
    } else {
      // If not the first node, link it to the last node
      this.tail.next = node;
    }
    //Step 2b: Assign node to tail if it is the only member of the linked list
    this.tail = node;
    //Step 3: Increment node count
    this.nodeCount++;
  }

  removeFirstNode(value) {
    //Determine if linked list has any nodes present
    if (this.nodeCount > 0) {
      //Step 1: Assign head to the following node
      this.head = this.head.next;

      //Step 2: Decrement node count
      this.nodeCount--;

      //Step 3: If linked list is now empty, set tail to null
      if (this.nodeCount === 0) {
        // If list empty, set tail to null
        this.tail = null;
      }
    }
  }

  removeLastNode(value) {
    //Step 1a: Determine if linked list has any nodes present
    if (this.nodeCount > 0) {
      //Step 1b: If this is case and it is the only node in the list, make head and tail null
      if (this.nodeCount === 1) {
        this.head = null;
        this.tail = null;
      } else {
        //Step 2: Find the second to last node
        let currentNode = this.head;
        //Step 3: Iterate through linked list until tail is found, reassigning the current node to the next node.
        while (currentNode.next !== this.tail) {
          currentNode = currentNode.next;
        }
        //Step 4:  Once tail is found, set current node's next value to null.
        currentNode.next = null;
        //Step 5: Assign tail value of linked list to the current node.
        this.tail = currentNode;
      }
    }
  }

  displayQueueObj(log) {
    let currentNode = this.head;
    while (currentNode) {
      log(currentNode.value);
      currentNode = currentNode.next;
    }
  }
}
//---- End of LinkedList Class declaration ----

// -------- Queue Class declaration ----------

class Queue {
  constructor() {
    this.linkedQueue = new LinkedList();
  }
  //Declare enqueue method that takes in the node as parameter
  enqueue(item) {
    //Call addNodeAsFirst method from linked list class on linkedQueue which will add it as the top node in the queue.
    this.linkedQueue.addNodeAsLast(item);
  }

  //Declare dequeue method
  dequeue() {
    if (!this.linkedQueue.listLength) {
      return;
    };
    //If queue has at least one node, determine its value
    let val = this.linkedQueue.head.value;
    //Call removeFirstNode method from linked list class on linkedQueue which will remove the top node on the queue.
    this.linkedQueue.removeFirstNode();

    return val;
  }

  peek() {
    if (!this.linkedQueue.head) { return; }
    return this.linkedQueue.head.value;
  }

  get listLength() {
    return this.linkedQueue.listLength;
  }

  displayQueueObj(log) {
    this.linkedQueue.displayQueueObj(log)
  }
}

module.exports = Queue;
