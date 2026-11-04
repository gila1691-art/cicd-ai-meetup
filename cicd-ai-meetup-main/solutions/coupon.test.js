// פתרון לדוגמה לתרגיל 3 — בדיקות ש-AI יכול לכתוב ל-applyCoupon.
// להעתיק ל-test/coupon.test.js
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { applyCoupon, calculateTotal } from '../src/pricing.js';

test('no coupon -> no discount', () => {
  assert.equal(applyCoupon(50, undefined), 50);
  assert.equal(applyCoupon(50, ''), 50);
});

test('unknown coupon -> no discount', () => {
  assert.equal(applyCoupon(50, 'FREECOFFEE'), 50);
});

test('WELCOME10 takes 10% off', () => {
  assert.equal(applyCoupon(50, 'WELCOME10'), 45);
});

test('coupon codes are case-insensitive', () => {
  assert.equal(applyCoupon(50, 'welcome10'), 45);
});

test('FIXED20 takes 20 off', () => {
  assert.equal(applyCoupon(50, 'FIXED20'), 30);
});

test('MEETUP25 requires a subtotal of at least 100', () => {
  assert.equal(applyCoupon(99.99, 'MEETUP25'), 99.99);
  assert.equal(applyCoupon(100, 'MEETUP25'), 75);
});

// הבדיקה הזו נכשלת על הקוד המקורי — באג אמיתי שה-AI "מצא"!
test('a fixed coupon never makes the price negative', () => {
  assert.equal(applyCoupon(15, 'FIXED20'), 0);
});

test('calculateTotal applies discount before VAT', () => {
  const r = calculateTotal([{ name: 'cake', price: 100, qty: 1 }], 'MEETUP25');
  assert.deepEqual(r, { subtotal: 100, discount: 25, vat: 13.5, total: 88.5 });
});

test('subtotal rejects a non-integer qty', () => {
  assert.throws(() => calculateTotal([{ name: 'x', price: 5, qty: 1.5 }]), /invalid qty/);
});
