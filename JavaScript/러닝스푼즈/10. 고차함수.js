//# 어레이를 다룰 때 가장 많이 쓰는 함수
//# map 함수
const arr = [1, 2, 3];

arr.map((v) => v + 1)  // [2, 3, 4] 
console.log(arr)

//# filter 함수
arr.filter((v) => v > 2);
console.log(arr)

//# reduce 함수
arr.reduce((prev, curr)=> prev + curr, 0)  // curr: 1, (0, 1), curr: 2, (1, 2), curr: 3 (3, 3) => 6