# @datastructures-ts/queue

A performant queue implementation in TypeScript with full type safety.

## Installation

```bash
pnpm add @datastructures-ts/queue
```

## Usage

```typescript
import { Queue } from '@datastructures-ts/queue';

// Create a new queue
const queue = new Queue<number>();

// Add elements
queue.enqueue(1);
queue.enqueue(2);
queue.enqueue(3);

// Remove elements
const first = queue.dequeue(); // 1
const second = queue.dequeue(); // 2

// Check size and peek
console.log(queue.size()); // 1
console.log(queue.front()); // 3
console.log(queue.back()); // 3

// Convert to array
console.log(queue.toArray()); // [3]

// Create from array
const queueFromArray = Queue.fromArray([1, 2, 3]);
```

## API

### Constructor

- `new Queue<T>(elements?: T[])` - Creates a new queue, optionally with initial elements

### Methods

- `enqueue(element: T): Queue<T>` - Adds an element to the back of the queue
- `push(element: T): Queue<T>` - Alias for enqueue
- `dequeue(): T | null` - Removes and returns the front element
- `pop(): T | null` - Alias for dequeue
- `front(): T | null` - Returns the front element without removing it
- `back(): T | null` - Returns the back element without removing it
- `size(): number` - Returns the number of elements in the queue
- `isEmpty(): boolean` - Checks if the queue is empty
- `toArray(): T[]` - Returns the queue elements as an array
- `clear(): void` - Removes all elements from the queue
- `clone(): Queue<T>` - Creates a shallow copy of the queue

### Static Methods

- `Queue.fromArray<T>(elements: T[]): Queue<T>` - Creates a queue from an array

## License

MIT © 2025 Hatef Rad <hatefrad@gmail.com>
