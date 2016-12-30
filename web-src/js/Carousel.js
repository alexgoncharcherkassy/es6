class Carousel {
    constructor(options) {
        const config = {
            speed: 7000,
            acceleration: 3,
            reverse: false,
            selector: '.c-carousel',
            slidesSelector: '.c-carousel__slides',
            leftArrowSelector: '.c-carousel__arrow--left',
            rightArrowSelector: '.c-carousel__arrow--right'
        };

        this.options = Object.assign(config, options);
        this.paused = false;
        this.stopped = false;

        this.init();
    }

    init() {
        var carousel = document.querySelector(this.options.selector);
        var slides = this._slides = carousel.querySelector(this.options.slidesSelector);
        this._leftArrow = carousel.querySelector(this.options.leftArrowSelector);
        this._rightArrow = carousel.querySelector(this.options.rightArrowSelector);

        this.options.speed = this.options.speed * slides.children.length;

        this.width = slides.offsetWidth;

        var count = slides.children.length;
        for (var i = 0; i < 5; i++) {
            slides.innerHTML += slides.innerHTML;
        }

        this.registerEvents();
        this.animate();
    };

    registerEvents() {
        var speed = this.options.speed;
        var reverse = this.options.reverse;

        this._rightArrow.addEventListener('mouseover', () => {
            this.options.speed = speed / this.options.acceleration;
            this.options.reverse = false;
        });

        this._rightArrow.addEventListener('mouseleave', () => {
            this.options.speed = speed;
            this.options.reverse = reverse;
        });
        this._leftArrow.addEventListener('mouseover', () => {
            this.options.speed = speed / this.options.acceleration;
            this.options.reverse = true;
        });
        this._leftArrow.addEventListener('mouseleave', () => {
            this.options.speed = speed;
            this.options.reverse = reverse;
        });

        this._slides.addEventListener('mouseover', this.pause.bind(this));
        this._slides.addEventListener('mouseleave', this.start.bind(this));

        window.addEventListener('resize', () => {
            this.width = this._slides.offsetWidth;
        });
    };

    pause() {
        this.paused = true;
    };

    start() {
        this.paused = false;
    };

    stop() {
        this.stopped = true;
    };

    animate() {
        var slides = this._slides;
        var oneThird = slides.lastElementChild.getBoundingClientRect().right / 3;
        var framesCount = 0;
        var step = 0;
        var posX = 0;

        var _animate = () => {
            if (!this.paused) {
                // console.log(this);
                framesCount = this.options.speed * 200 / 1000;
                step = oneThird / framesCount;

                posX += this.options.reverse ? step : -step;

                slides.style.transform = 'translateX(' + posX + 'px)';

                if (this.options.reverse) {
                    if (posX >= this.width - oneThird) {
                        posX = this.width - oneThird * 2;
                    }
                } else {
                    if (Math.abs(posX) >= oneThird * 2) {
                        posX = -oneThird;
                    }
                }
            }
            !this.stopped && requestAnimationFrame(_animate);
        };
        _animate();
    };
}

export default Carousel;
