/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

/* eslint-disable */
const removeEles = function (query, ancestor = document) {
  const els = ancestor.querySelectorAll(query);

  for (let i = 0; i < els.length; i++) {
    const el = els[i];

    el.parentNode.removeChild(el);
  }
};

const setStyles = function (el, style) {
  const props = Object.keys(style);

  for (let i = 0, l = props.length; i < l; i++) {
    el.style[props[i]] = style[props[i]];
  }
};

const createElement = function (options) {
  options = options || {};

  const el = document.createElement(options.tag || 'div');

  el.className = options.class || '';

  if (options.style) {
    setStyles(el, options.style);
  }

  return el;
};

const getPixelRatio = function () {
  return window.devicePixelRatio || 1;
};

const getOffset = function (el) {
  const offset = el.getBoundingClientRect();

  return {
    left: offset.left + document.body.scrollLeft
          + parseFloat(getComputedStyle(document.body)['padding-left'])
          + parseFloat(getComputedStyle(document.body)['border-left-width']),
    top: offset.top + document.body.scrollTop
         + parseFloat(getComputedStyle(document.body)['padding-top'])
         + parseFloat(getComputedStyle(document.body)['border-top-width']),
  };
};

module.exports = {
  removeEles, setStyles, createElement, getPixelRatio, getOffset,
};
