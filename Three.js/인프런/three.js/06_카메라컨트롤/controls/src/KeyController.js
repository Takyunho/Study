export class KeyController {
    constructor() {
        // 생성자
        this.keys = [];

        window.addEventListener('keydown', e => {
            console.log(e)
            // console.log(e.code + ' 누름')
            this.keys[e.code] = true;   // 키보드의 키를 눌렀을때 keys라는 배열에 담김
        })

        window.addEventListener('keyup', e => {
            // console.log(e.code + ' 뗌')
            delete this.keys[e.code];       // w에서 손을 뗐다면, this.keys배열에서 'keyW' 이름의 속성을 삭제.
            // 즉, this.keys["keyW"]를 삭제하는 것
        })

    }
}