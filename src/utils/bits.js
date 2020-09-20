/* eslint no-bitwise:0 */

export const test = (num, bit) => (num >> bit) % 2 !== 0;

export const set = (num, bit) => num | (1 << bit);

export const clear = (num, bit) => num & ~(1 << bit);

export const toggle = (num, bit) => (test(num, bit) ? clear(num, bit) : set(num, bit));

export const enable = (num, mask) => num | mask;

export const disable = (num, mask) => (num > mask ? num - mask : 0);

export const count = (num) => num.toString(2).replace(/0/g, '').length;
