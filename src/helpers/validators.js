/**
 * @file Домашка по FP ч. 1
 *
 * Основная задача — написать самому, или найти в FP библиотеках функции anyPass/allPass
 * Эти функции/их аналоги есть и в ramda и в lodash
 *
 * allPass — принимает массив функций-предикатов, и возвращает функцию-предикат, которая
 * вернет true для заданного списка аргументов, если каждый из предоставленных предикатов
 * удовлетворяет этим аргументам (возвращает true)
 *
 * anyPass — то же самое, только удовлетворять значению может единственная функция-предикат из массива.
 *
 * Если какие либо функции написаны руками (без использования библиотек) это не является ошибкой
 */

import { SHAPES, COLORS } from '../constants';

import {
  equals,
  values,
  filter,
  anyPass,
  allPass,
  gte,
  or,
  not,
  and,
  length,
  prop,
  compose,
} from 'ramda';
const sameColors = (color) => compose(equals(color));
const inputColors = (figure, color) => compose(sameColors(color), prop(figure));

//inditification of vars and making them the part of exports objects
const { TRIANGLE, SQUARE, CIRCLE, STAR } = SHAPES;
const { RED, BLUE, ORANGE, GREEN, WHITE } = COLORS;

// 1. Красная звезда, зеленый квадрат, все остальные белые.
export const validateFieldN1 = (obj) => {
  return allPass([
    inputColors(STAR, RED),
    inputColors(SQUARE, GREEN),
    inputColors(TRIANGLE, WHITE),
    inputColors(CIRCLE, WHITE),
  ])(obj);
};

// 2. Как минимум две фигуры зеленые.
export const validateFieldN2 = (obj) => {
  return gte(length(filter(equals(GREEN), values(obj))), 2);
};

// 3. Количество красных фигур равно кол-ву синих.
export const validateFieldN3 = (obj) => {
  const blue = length(filter(equals(BLUE), values(obj)));
  const red = length(filter(equals(RED), values(obj)));
  return and(equals(blue, red), not(equals(red, 0)));
};

// 4. Синий круг, красная звезда, оранжевый квадрат
export const validateFieldN4 = (obj) => {
  return allPass([
    inputColors(STAR, RED),
    inputColors(SQUARE, ORANGE),
    inputColors(CIRCLE, BLUE),
  ])(obj);
};
// 5. Три фигуры одного любого цвета кроме белого.
export const validateFieldN5 = (obj) => {
  const red = gte(length(filter(equals(RED), values(obj))), 3);
  const blue = gte(length(filter(equals(BLUE), values(obj))), 3);
  const orange = gte(length(filter(equals(ORANGE), values(obj))), 3);
  const green = gte(length(filter(equals(GREEN), values(obj))), 3);

  return or(green, or(red, or(blue, orange)));
};

// 6. Две зеленые фигуры (одна из них треугольник), еще одна любая красная.
export const validateFieldN6 = (obj) => {
  const green = anyPass([
    inputColors(STAR, GREEN),
    inputColors(SQUARE, GREEN),
    inputColors(CIRCLE, GREEN),
  ])(obj);
  const red = filter(equals(RED), values(obj));
  return and(
    inputColors(TRIANGLE, GREEN)(obj),
    and(green, gte(length(red), 0))
  );
};

// 7. Все фигуры оранжевые.
export const validateFieldN7 = (obj) => {
  return equals(length(filter(equals(ORANGE), values(obj))), 4);
};

// 8. Не красная и не белая звезда.
export const validateFieldN8 = (obj) => {
  return and(
    not(inputColors(STAR, WHITE)(obj)),
    not(inputColors(STAR, RED)(obj))
  );
};

// 9. Все фигуры зеленые.
export const validateFieldN9 = (obj) => {
  return equals(length(filter(equals(GREEN), values(obj))), 4);
};

// 10. Треугольник и квадрат одного цвета (не белого)
export const validateFieldN10 = (obj) => {
  const colorTriangle = prop(TRIANGLE, obj);
  const colorSquare = prop(SQUARE, obj);

  return and(
    equals(colorTriangle, colorSquare),
    and(not(equals(colorTriangle, WHITE)), not(equals(colorSquare, WHITE)))
  );
};
