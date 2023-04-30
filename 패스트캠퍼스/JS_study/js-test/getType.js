//=> Object.prototype.toString.call()을 이용해서 데이터들의 타입을 더 정확하게 알 수 있다.
export default function getType(data) {
    return Object.prototype.toString.call(data).slice(8, -1)
}