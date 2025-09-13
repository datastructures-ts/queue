import { describe, it, expect, beforeEach } from 'vitest';
import { Queue } from '../src/queue';

describe('Queue unit tests', () => {
  let queue: Queue<number>;

  beforeEach(() => {
    queue = new Queue<number>();
  });

  describe('new Queue()', () => {
    it('creates an empty queue', () => {
      expect(queue.size()).toBe(0);
      expect(queue.isEmpty()).toBe(true);
    });
  });

  describe('Queue.fromArray(list)', () => {
    it('creates a queue from an existing array', () => {
      const q = Queue.fromArray([1, 2, 3]);
      expect(q.front()).toBe(1);
      expect(q.size()).toBe(3);
    });
  });

  describe('.enqueue(element)', () => {
    it('should enqueue 3 elements to the stack', () => {
      queue.enqueue(1);
      queue.enqueue(8);
      queue.push(45);
      expect(queue.size()).toBe(3);
      expect(queue.front()).toBe(1);
      expect(queue.back()).toBe(45);
    });
  });

  describe('.front()', () => {
    it('should peek the front element', () => {
      queue.enqueue(1);
      expect(queue.front()).toBe(1);
    });
  });

  describe('.back()', () => {
    it('should peek the back element', () => {
      queue.enqueue(1);
      queue.enqueue(2);
      expect(queue.back()).toBe(2);
    });
  });

  describe('.isEmpty()', () => {
    it('should not be empty after enqueue', () => {
      queue.enqueue(1);
      expect(queue.isEmpty()).toBe(false);
    });
  });

  describe('.clone()', () => {
    it('clone a queue', () => {
      queue.enqueue(1);
      queue.enqueue(8);
      queue.enqueue(45);
      queue.dequeue();
      const clone = queue.clone();
      clone.dequeue();
      expect(clone.front()).toBe(45);
      expect(clone.size()).toBe(1);
      expect(queue.front()).toBe(8);
      expect(queue.size()).toBe(2);
    });
  });

  describe('toArray()', () => {
    it('should convert the queue into an array', () => {
      queue.enqueue(8);
      queue.enqueue(45);
      expect(queue.toArray()).toEqual([8, 45]);
    });
  });

  describe('dequeue()', () => {
    it('should dequeue all elements', () => {
      queue.enqueue(8);
      queue.enqueue(45);
      expect(queue.dequeue()).toBe(8);
      expect(queue.pop()).toBe(45);
    });
  });

  describe('.clear()', () => {
    it('should clear the queue and return this for chaining', () => {
      queue.enqueue(1);
      queue.enqueue(2);
      queue.enqueue(3);
      const result = queue.clear();
      expect(result).toBe(queue);
      expect(queue.dequeue()).toBeNull();
      expect(queue.front()).toBeNull();
      expect(queue.back()).toBeNull();
      expect(queue.size()).toBe(0);
      expect(queue.isEmpty()).toBe(true);
    });
  });

  describe('.frontOrThrow()', () => {
    it('should return front element when queue is not empty', () => {
      queue.enqueue(1);
      queue.enqueue(2);
      expect(queue.frontOrThrow()).toBe(1);
    });

    it('should throw error when queue is empty', () => {
      expect(() => queue.frontOrThrow()).toThrow('Queue is empty');
    });
  });

  describe('.backOrThrow()', () => {
    it('should return back element when queue is not empty', () => {
      queue.enqueue(1);
      queue.enqueue(2);
      expect(queue.backOrThrow()).toBe(2);
    });

    it('should throw error when queue is empty', () => {
      expect(() => queue.backOrThrow()).toThrow('Queue is empty');
    });
  });
});
