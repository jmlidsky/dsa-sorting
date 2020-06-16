// BUBBLE SORT
// loop through an array to find out whether adjacent values need swapping, and keep going until there are no more values that need swapping
// best case nodes are already in order and just need to check each pair 1 time  - O(n)
// worst and avg case each value needs swapping - O(n^2)


// swaps the values at 2 indices in an array
function swap(array, i, j) {
    const tmp = array[i];
    array[i] = array[j];
    array[j] = tmp;
};

// looks through adjacent pairs of values in the array
// if the values are in the wrong order, then it swaps them around and increases the swaps counter
function bubbleSort(array) {
    let swaps = 0;
    for (let i = 0; i < array.length - 1; i++) {
        if (array[i] > array[i + 1]) {
            swap(array, i, i + 1);
            swaps++;
        }
    }

    // if number of swaps is greater than 0, then the list is not in the correct order yet, so you need to call bubbleSort again to keep sorting
    if (swaps > 0) {
        return bubbleSort(array);
    }
    return array;
};

// MERGE SORT
// breaks the array down into continually smaller chunks, then merges them back together in the correct order
// best, avg, and worst case of O(nlog(n))
function mergeSort(array) {
    // if array has 0/1 items, it is sorted
    if (array.length <= 1) {
        return array;
    }

    // slice the array into 2 halves and sort each half by recursively calling mergeSort
    // two sorted halves are then merged together in the correct order using the merge function
    const middle = Math.floor(array.length / 2);
    let left = array.slice(0, middle);
    let right = array.slice(middle, array.length);

    left = mergeSort(left);
    right = mergeSort(right);
    return merge(left, right, array);
};

// to merge, choose the lowest value from the left or right arrays that hasn't already been added to the output array
// when one of the arrays is empty, add all of the remaining values from the other array to it
function merge(left, right, array) {
    let leftIndex = 0;
    let rightIndex = 0;
    let outputIndex = 0;
    while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex] < right[rightIndex]) {
            array[outputIndex++] = left[leftIndex++];
        }
        else {
            array[outputIndex++] = right[rightIndex++];
        }
    }

    for (let i = leftIndex; i < left.length; i++) {
        array[outputIndex++] = left[i];
    }

    for (let i = rightIndex; i < right.length; i++) {
        array[outputIndex++] = right[i];
    }
    return array;
};

// QUICKSORT
// partition the array into 2 halves around a pivot value
// all of the values which are less than the pivot value go to 2 half of the array and all of the values which are greater go to the other half of the array
// recursively sort the 2 halves of the array until the halves are of length 0 or 1
// best and avg case - O(nlog(n))
// worst case - O(n^2)
function quickSort(array, start = 0, end = array.length) {
    if (start >= end) {
        return array;
    }
    const middle = partition(array, start, end);
    array = quickSort(array, start, middle);
    array = quickSort(array, middle + 1, end);
    return array;
};

// loop through the array, swapping values as you go to put them on either side of the pivot point
// finally, put the pivot into the correct place in the array
function partition(array, start, end) {
    const pivot = array[end - 1];
    let j = start;
    for (let i = start; i < end - 1; i++) {
        if (array[i] <= pivot) {
            swap(array, i, j);
            j++;
        }
    }
    swap(array, end-1, j);
    return j;
};