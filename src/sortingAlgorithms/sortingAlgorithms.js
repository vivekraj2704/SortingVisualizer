export function getMergeSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    const auxiliaryArray = array.slice();
    mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
    return animations;
  }
  
  function mergeSortHelper(
    mainArray,
    startIdx,
    endIdx,
    auxiliaryArray,
    animations,
  ) {
    if (startIdx === endIdx) return;
    const middleIdx = Math.floor((startIdx + endIdx) / 2);
    mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
    mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
    doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
  }
  
  function doMerge(
    mainArray,
    startIdx,
    middleIdx,
    endIdx,
    auxiliaryArray,
    animations,
  ) {
    let k = startIdx;
    let i = startIdx;
    let j = middleIdx + 1;
    while (i <= middleIdx && j <= endIdx) {
      // These are the values that we're comparing; we push them once
      // to change their color.
      animations.push([i, j]);
      // These are the values that we're comparing; we push them a second
      // time to revert their color.
      animations.push([i, j]);
      if (auxiliaryArray[i] <= auxiliaryArray[j]) {
        // We overwrite the value at index k in the original array with the
        // value at index i in the auxiliary array.
        animations.push([k, auxiliaryArray[i]]);
        mainArray[k++] = auxiliaryArray[i++];
      } else {
        // We overwrite the value at index k in the original array with the
        // value at index j in the auxiliary array.
        animations.push([k, auxiliaryArray[j]]);
        mainArray[k++] = auxiliaryArray[j++];
      }
    }
    while (i <= middleIdx) {
      // These are the values that we're comparing; we push them once
      // to change their color.
      animations.push([i, i]);
      // These are the values that we're comparing; we push them a second
      // time to revert their color.
      animations.push([i, i]);
      // We overwrite the value at index k in the original array with the
      // value at index i in the auxiliary array.
      animations.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    }
    while (j <= endIdx) {
      // These are the values that we're comparing; we push them once
      // to change their color.
      animations.push([j, j]);
      // These are the values that we're comparing; we push them a second
      // time to revert their color.
      animations.push([j, j]);
      // We overwrite the value at index k in the original array with the
      // value at index j in the auxiliary array.
      animations.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }

  //Quick Sort
  export function getQuickSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    quickSortHelper(array, 0, array.length - 1, animations);
    return animations;
  }
  
  function quickSortHelper(mainArray, startIdx, endIdx, animations) {
    if (startIdx < endIdx) {
      const pivotIdx = partition(mainArray, startIdx, endIdx, animations);
      quickSortHelper(mainArray, startIdx, pivotIdx - 1, animations);
      quickSortHelper(mainArray, pivotIdx + 1, endIdx, animations);
    }
  }
  
  function partition(array, startIdx, endIdx, animations) {
    const pivot = array[endIdx];
    let i = startIdx - 1;
    for (let j = startIdx; j < endIdx; j++) {
      animations.push([i + 1, j, true, true]);
      animations.push([i + 1, j, true, false]);
      if (array[j] < pivot) {
        i++;
        [array[i], array[j]] = [array[j], array[i]];
        animations.push([i, array[i]]);
        animations.push([j, array[j]]);
      } else {
        animations.push([j, array[j]]);
        animations.push([j, array[j]]);
      }
    }
    animations.push([i + 1, endIdx, true, true]);
    animations.push([i + 1, endIdx, true, false]);
    [array[i + 1], array[endIdx]] = [array[endIdx], array[i + 1]];
    animations.push([i + 1, array[i + 1]]);
    animations.push([endIdx, array[endIdx]]);
    return i + 1;
  }

  //Heap Sort

  export function getHeapSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    heapSortHelper(array, animations);
    return animations;
  }
  
  function heapSortHelper(array, animations) {
    const n = array.length;
  
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      heapify(array, n, i, animations);
    }
  
    for (let i = n - 1; i > 0; i--) {
      animations.push([0, i, true, true]);
      animations.push([0, i, true, false]);
      [array[0], array[i]] = [array[i], array[0]];
      animations.push([0, array[0]]);
      animations.push([i, array[i]]);
      heapify(array, i, 0, animations);
    }
  }
  
  function heapify(array, n, i, animations) {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;
  
    if (left < n && array[left] > array[largest]) {
      largest = left;
    }
  
    if (right < n && array[right] > array[largest]) {
      largest = right;
    }
  
    if (largest !== i) {
      animations.push([i, largest, true, true]);
      animations.push([i, largest, true, false]);
      [array[i], array[largest]] = [array[largest], array[i]];
      animations.push([i, array[i]]);
      animations.push([largest, array[largest]]);
      heapify(array, n, largest, animations);
    }
  }


  //Bubble Sort
  export function getBubbleSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    bubbleSortHelper(array, animations);
    return animations;
  }
  
  function bubbleSortHelper(array, animations) {
    const n = array.length;
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        animations.push([j, j + 1, true, true]);
        animations.push([j, j + 1, true, false]);
        if (array[j] > array[j + 1]) {
          [array[j], array[j + 1]] = [array[j + 1], array[j]];
          animations.push([j, array[j]]);
          animations.push([j + 1, array[j + 1]]);
        } else {
          animations.push([j, array[j]]);
          animations.push([j + 1, array[j + 1]]);
        }
      }
    }
  }
  
  
