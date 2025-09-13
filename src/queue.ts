/**
 * A performant, type-safe queue implementation.
 * @license MIT
 * @copyright 2025 Hatef Rad <hatefrad@gmail.com>
 */
export class Queue<T = unknown> {
  private _elements: T[];
  private _offset: number;

  /**
   * Creates a new queue.
   * @param elements Optional initial elements.
   */
  constructor(elements?: readonly T[]) {
    this._elements = Array.isArray(elements) ? [...elements] : [];
    this._offset = 0;
  }

  /**
   * Adds an element to the back of the queue.
   * Alias: push
   * @param element - The element to add
   * @returns The queue instance for chaining
   */
  enqueue(element: T): Queue<T> {
    this._elements.push(element);
    return this;
  }

  /**
   * Alias for enqueue.
   * @param element - The element to add
   * @returns The queue instance for chaining
   */
  push(element: T): Queue<T> {
    return this.enqueue(element);
  }

  /**
   * Removes and returns the front element, or null if empty.
   * Alias: pop
   * @returns The front element or null if queue is empty
   */
  dequeue(): T | null {
    if (this.size() === 0) return null;

    const first = this.front();
    this._offset += 1;

    if (this._offset * 2 < this._elements.length) return first;

    // only remove dequeued elements when reaching half size
    // to decrease latency of shifting elements.
    this._elements = this._elements.slice(this._offset);
    this._offset = 0;
    return first;
  }

  /**
   * Alias for dequeue.
   * @returns The front element or null if queue is empty
   */
  pop(): T | null {
    return this.dequeue();
  }

  /**
   * Returns the front element without removing it, or null if empty.
   * @returns The front element or null if queue is empty
   */
  front(): T | null {
    return this.size() > 0 ? this._elements[this._offset] : null;
  }

  /**
   * Returns the back element without removing it, or null if empty.
   * @returns The back element or null if queue is empty
   */
  back(): T | null {
    return this.size() > 0 ? this._elements[this._elements.length - 1] : null;
  }

  /**
   * Returns the number of elements in the queue.
   * @returns The number of elements
   */
  size(): number {
    return this._elements.length - this._offset;
  }

  /**
   * Returns true if the queue is empty.
   * @returns True if the queue is empty, false otherwise
   */
  isEmpty(): this is Queue<never> {
    return this.size() === 0;
  }

  /**
   * Returns a shallow array of remaining elements.
   * @returns Array of remaining elements
   */
  toArray(): readonly T[] {
    return this._elements.slice(this._offset);
  }

  /**
   * Removes all elements from the queue.
   */
  clear(): this {
    this._elements = [];
    this._offset = 0;
    return this;
  }

  /**
   * Returns a shallow copy of the queue.
   * @returns A new Queue instance with copied elements
   */
  clone(): Queue<T> {
    return new Queue<T>(this._elements.slice(this._offset));
  }

  /**
   * Returns the front element, throwing an error if the queue is empty.
   * @returns The front element
   * @throws Error if the queue is empty
   */
  frontOrThrow(): T {
    if (this.isEmpty()) {
      throw new Error('Queue is empty');
    }
    return this._elements[this._offset]!;
  }

  /**
   * Returns the back element, throwing an error if the queue is empty.
   * @returns The back element
   * @throws Error if the queue is empty
   */
  backOrThrow(): T {
    if (this.isEmpty()) {
      throw new Error('Queue is empty');
    }
    return this._elements[this._elements.length - 1]!;
  }

  /**
   * Creates a queue from an array.
   * @param elements - Array of elements to create queue from
   * @returns A new Queue instance
   */
  static fromArray<T>(elements: readonly T[]): Queue<T> {
    return new Queue<T>(elements);
  }
}
