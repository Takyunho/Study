export class PreventDragClick {
    constructor(canvas) {
        this.mouseMoved;
        this.clickStartX;
        this.clickStartY;
        this.clickStartTime;

        this.canvas = canvas;
        this.mouseDown();
        this.mouseUp();
    }

    mouseDown() {
        this.canvas.addEventListener('mousedown', e => {
            this.clickStartX = e.clientX;
            this.clickStartY = e.clientY;
            this.clickStartTime = Date.now();
        })
    }

    mouseUp() {
        this.canvas.addEventListener('mouseup', e => {
            const xGap = Math.abs(e.clientX - this.clickStartX);		// 절대값으로 만들어서 마우스의 이동 거리를 계산
            const yGap = Math.abs(e.clientY - this.clickStartY);
            const timeGap = Date.now() - this.clickStartTime;
    
            if (xGap > 5 || yGap > 5 || timeGap > 500) {	// 500ms = 0.5초
                this.mouseMoved = true;	// 5보다 크게 움직인거니까 마우스 움직인거임
            } else {
                this.mouseMoved = false;	// 마우스 움직인거 아님
            }
            //! mouseMoved 의 boolean 값을 가지고 raycaster를 판단해서 클릭인지 드래그인지 알 수 있음!
            //! 그러나 마우스를 드래그 했다가 다시 원점으로 되돌아오는 경우에 클릭으로 인식됨
            //! 따라서 마우스를 클릭한 시점부터 마우스를 뗀 시점까지의 시간을 구해서 일정 시간이 지났다고 판단되면 드래그인것으로 즉, mouseMoved를 true로 지정
        })
    }

}