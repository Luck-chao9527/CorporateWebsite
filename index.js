
// 轮播图 S
const glide = new Glide('.glide',{
    type: "carousel",
    startAt: 0,
    autoplay: 3500,
});
const captionsEl = document.querySelectorAll('.slide-caption');

// mount.after 首次安装后立即调用。所有组件均已安装。
// run.after 轮播后调用
glide.on(["mount.after", "run.after"],() => {
    const caption = captionsEl[glide.index];    // 获取当前轮播图的标题
    // 调用 anime 动画
    anime({
        targets: caption.children,  // 动画作用于 caption 的子元素
        opacity: [0,1],     // 透明度从 0 过度 1
        duration: 400,      // 动画执行时间 400ms
        easing: 'linear',    // 过渡类型
        delay: anime.stagger(400,{start: 300}),     // 延迟 每个子元素延迟400ms,第一个子元素延迟 300ms
        translateY: [anime.stagger([40, 20]), 0],   // 向上移动，第一个值是50 也就是标题向上移动50 ，最后回到原来的位置 0
                                                    // 第二，第三依次减少，但不少于 20
    })
})

// run.before   轮播之前
glide.on('run.before',() => {
    document.querySelectorAll('.slide-caption > *').forEach(el => {
        el.style.opacity = '0';
    })

})

glide.mount();

// 轮播图 E

// 成功案例 S
const isotope = new Isotope('.cases',{
    layoutMode: 'fitRows',      // 行布局，占满一行自动换行
    itemSelector: ".case-item",     // 每个图片的 item
})

const filterBts = document.querySelector('.filter-btns');   // 按钮的父级

filterBts.addEventListener('click',e => {
    let {target} = e;    // 相当于 let target = e.target
    const filterOption = target.getAttribute("data-filter");    // 获取当前点击DOM元素的 data-filter 属性
    if(filterOption){
        // 排他思想
        document.querySelectorAll('.btn-active').forEach(el => {
            el.classList.remove('btn-active');
        })
        target.classList.add('btn-active');
        isotope.arrange({ filter: filterOption });  // 调用
    }

})

// 成功案例 E


// 监听滚动 S
const headerEl = document.querySelector('header');
const scrollToTop = document.querySelector('.scroll-to-top');

window.addEventListener('scroll',() => {
    let height = headerEl.getBoundingClientRect().height;   // 返回 header 的高度
    console.log(window.pageYOffset);
    if(window.pageYOffset - height > 723){
        if(!headerEl.classList.contains('sticky')){
            headerEl.classList.remove('leave');
            headerEl.classList.add('sticky');
        }
    }else{
        headerEl.classList.remove('sticky');
        headerEl.classList.add('leave');
    }
    if(window.pageYOffset > 2000){
        scrollToTop.style.display = 'block'
    }else{
        scrollToTop.style.display = 'none'
    }

    const bottom = dataSectionEl.getBoundingClientRect().bottom;
    const top = dataSectionEl.getBoundingClientRect().top;

    if(bottom >= 80 && top <= window.innerHeight){
        dataSectionEl.style.backgroundPosition = `center calc(50% - ${bottom / 5}px)`
    }
    if(headerEl.classList.contains("open")) {
        headerEl.classList.remove("open");
    }

})

// 监听滚动 E


// scrollReveal 页面滚动显示分数 S

const staggeringOption = {
    delay: 300,     // 延迟300
    distance: '50px',       // 从-50px移动到原来的位置
    duration: 500,          // 持续时间
    easing: 'ease-in-out',  // 类型
    origin: 'bottom'        // 从下向上
}
// interval  表示 feature 隔350毫秒轮流出现
ScrollReveal().reveal('.feature',{...staggeringOption,interval: 350});
ScrollReveal().reveal('.service-item',{...staggeringOption,interval: 350});

const dataSectionEl = document.querySelector('.data-section');
ScrollReveal().reveal('.data-section',{
    // beforeReveal = .data-section 出现之前
    beforeReveal: () => {
        anime({
            targets: '.data-piece .num',    // 动画作用于的对象
            // innerHTML: el => {
            //     return [0,el.innerHTML]
            // },
            innerHTML: [0,this.innerHTML],   // innerHTML数值从0增长到原来的数值
            duration: 1500,     // 持续时间
            round: 1,      // 增加幅度
            easing: 'linear'    // 过度特效
        });
        dataSectionEl.style.backgroundPosition = `center calc(50% - ${dataSectionEl.getBoundingClientRect().bottom / 5}px)`
    }
})
// scrollReveal 页面滚动显示分数 E

// 锚链接流畅滚动 S
    const scroll = new SmoothScroll('nav a[href*="#"] , .scroll-to-top a[href*="#"]',{
        header: "header",   // 固定的导航
        offset: 80,     // 多余滚动
    })

    const exploreBtnEl = document.querySelectorAll('.explore-btn');
    exploreBtnEl.forEach(el => {
        el.addEventListener('click', () => {
            scroll.animateScroll(document.querySelector('#about-us'))
        })
    })
// 锚链接流畅滚动 E


const burgerEl = document.querySelector(".burger");
burgerEl.addEventListener("click", () => {
    headerEl.classList.toggle("open");
})





























