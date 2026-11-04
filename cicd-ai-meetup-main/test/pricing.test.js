import { test } from 'node:test';
import assert from 'node:assert/strict';
import { subtotal, calculateTotal } from '../src/pricing.js';

const latte = { name: 'latte', price: 16, qty: 2 };
const croissant = { name: 'croissant', price: 14.5, qty: 1 };

test('subtotal sums price * qty', () => {
  assert.equal(subtotal([latte, croissant]), 46.5);
});

test('subtotal rejects an empty order', () => {
  assert.throws(() => subtotal([]), /at least one item/);
});

test('subtotal rejects a negative price', () => {
  assert.throws(() => subtotal([{ name: 'x', price: -1, qty: 1 }]), /invalid price/);
});

test('calculateTotal adds 18% VAT when there is no coupon', () => {
  assert.deepEqual(calculateTotal([latte]), {
    subtotal: 32,
    discount: 0,
    vat: 5.76,
    total: 37.76,
  });
});

// TODO (תרגיל 3): applyCoupon לא נבדקת בכלל.
// בקשו מ-AI לכתוב בדיקות לכל הקופונים ולמקרי קצה.
