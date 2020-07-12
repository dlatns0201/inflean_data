(() => {
    const sceneInfo = [
        {
            type: 'sticky',
            heightNum: 5, // 브라우저 높이의 5배로 scrollHeight 세팅
            scrollHeight: 0,
            objs: {
                container: document.querySelector('.scroll_section.section0'),
                messages: document.querySelectorAll('.scroll_section.section0 .main_message')
            },
            values: {
                messages: [
                    {
                        opacity_in: [0, 1, { start: 0.1, end: 0.2}],
                        opacity_out: [1, 0, { start: 0.25, end: 0.3}],
                        translateY_in: [20, 0, { start: 0.1, end: 0.2}],
                        translateY_out: [0, -20, { start: 0.25, end: 0.3}]
                    },
                    {
                        opacity_in: [0, 1, { start: 0.3, end: 0.4 }],
                        opacity_out: [1, 0, { start: 0.45, end: 0.5 }],
                        translateY_in: [20, 0, { start: 0.3, end: 0.4 }],
                        translateY_out: [0, -20, { start: 0.45, end: 0.5 }]
                    },
                    {
                        opacity_in: [0, 1, { start: 0.5, end: 0.6 }],
                        opacity_out: [1, 0, { start: 0.65, end: 0.7 }],
                        translateY_in: [20, 0, { start: 0.5, end: 0.6 }],
                        translateY_out: [0, -20, { start: 0.65, end: 0.7 }]
                    },
                    {
                        opacity_in: [0, 1, { start: 0.7, end: 0.8 }],
                        opacity_out: [1, 0, { start: 0.85, end: 0.9 }],
                        translateY_in: [20, 0, { start: 0.7, end: 0.8 }],
                        translateY_out: [0, -20, { start: 0.85, end: 0.9 }]
                    }
                ]
            }
        },
        {
            type: 'normal',
            scrollHeight: 0,
            objs: {
                container: document.querySelector('.scroll_section.section1')
            }
        },
        {
            type: 'sticky',
            heightNum: 5, // 브라우저 높이의 5배로 scrollHeight 세팅
            scrollHeight: 0,
            objs: {
                container: document.querySelector('.scroll_section.section2'),
                main_message: document.querySelector('.scroll_section.section2 .main_message'),
                dsc_messages: document.querySelectorAll('.scroll_section.section2 .dsc_message'),
                pinOne: document.querySelector('.scroll_section.section2 .dsc_message.one .pin'),
                pinTwo: document.querySelector('.scroll_section.section2 .dsc_message.two .pin')
            },
            values: {
                main_message: {
                    opacity_in: [0, 1, { start: 0.25, end: 0.3 }],
                    opacity_out: [1, 0, { start: 0.4, end: 0.45 }],
                    translateY_in: [20, 0, { start: 0.15, end: 0.2 }],
                    translateY_out: [0, -20, { start: 0.4, end: 0.45 }]
                },
                dsc_messages: [
                    {
                        opacity_in: [0, 1, { start: 0.6, end: 0.65 }],
                        opacity_out: [1, 0, { start: 0.68, end: 0.73 }],
                        translateY_in: [30, 0, { start: 0.6, end: 0.65 }],
                        translateY_out: [0, -20, { start: 0.68, end: 0.73 }]
                    },
                    {
                        opacity_in: [0, 1, { start: 0.87, end: 0.92 }],
                        opacity_out: [1, 0, { start: 0.95, end: 1 }],
                        translateY_in: [30, 0, { start: 0.87, end: 0.92 }],
                        translateY_out: [0, -20, { start: 0.95, end: 1 }]
                    }
                ],
                pinOne: {
                    scaleY: [0.5, 1, { start: 0.6, end: 0.65 }]
                },
                pinTwo: {
                    scaleY: [0.5, 1, { start: 0.87, end: 0.92 }]
                }
            }
        },
        {
            type: 'sticky',
            heightNum: 5, // 브라우저 높이의 5배로 scrollHeight 세팅
            scrollHeight: 0,
            objs: {
                container: document.querySelector('.scroll_section.section3'),
                canvasCaption: document.querySelector('.canvas-caption')
            }
        }
    ];
    let yOffset = 0;
    let prevScrollHeight = 0;
    let currentScene = 0;
    let enterNewScene = false;

    function setLayout() {
        for(let i=0; i<sceneInfo.length; i++) {
            if(sceneInfo[i].type === 'sticky') {
                sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
            } else if(sceneInfo[i].type === 'normal') {
                sceneInfo[i].scrollHeight = sceneInfo[i].objs.container.offsetHeight;
            }
            sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`;
        }

        let totalScrollHeight = 0;
        yOffset = window.pageYOffset;

        for(let i=0; i<sceneInfo.length; i++) {
            totalScrollHeight += sceneInfo[i].scrollHeight;
            if (totalScrollHeight >= yOffset) {
                currentScene = i;
                break;
            }
        }
        document.body.setAttribute('class', `show_scene${currentScene}`);
    }
    function calcValues (values, currentYOffset) {
        let rv;
        const scrollHeight = sceneInfo[currentScene].scrollHeight;
        const scrollRatio = currentYOffset / scrollHeight;

        if(values.length === 3) {
            const partScrollStart = values[2].start * scrollHeight;
            const partScrollEnd = values[2].end * scrollHeight;
            const partScrollHeight = partScrollEnd - partScrollStart;

            if(currentYOffset <= partScrollEnd && currentYOffset >= partScrollStart) {
                rv = (currentYOffset - partScrollStart) / partScrollHeight * (values[1] - values[0]) + values[0];
            } else if (currentYOffset < partScrollStart) {
                rv = values[0];
            } else if (currentYOffset > partScrollEnd) {
                rv = values[1];
            }
        } else {
            rv = values[0] + scrollRatio * (values[1]-values[0]);
        }

        return rv;
    }
    function playAnimation() {
        const objs = sceneInfo[currentScene].objs;
        const values = sceneInfo[currentScene].values;
        const currentYOffset = yOffset - prevScrollHeight;
        const scrollHeight = sceneInfo[currentScene].scrollHeight; 
        const scrollRatio = currentYOffset / scrollHeight;

        switch(currentScene) {
            case 0:
                if (scrollRatio <= 0.22) {
                    const messageOpacity_in = calcValues(values.messages[0].opacity_in, currentYOffset);
                    const messageTranslateY_in = calcValues(values.messages[0].translateY_in, currentYOffset);

                    objs.messages[0].style.opacity = messageOpacity_in;
                    objs.messages[0].style.transform = `translate3d(0, ${messageTranslateY_in}%, 0)`;
                } else {
                    const messageOpacity_out = calcValues(values.messages[0].opacity_out, currentYOffset);
                    const messageTranslateY_out = calcValues(values.messages[0].translateY_out, currentYOffset);

                    objs.messages[0].style.opacity = messageOpacity_out;
                    objs.messages[0].style.transform = `translate3d(0, (${messageTranslateY_out}%, 0)`;
                }
                if (scrollRatio <= 0.42) {
                    const messageOpacity_in = calcValues(values.messages[1].opacity_in, currentYOffset);
                    const messageTranslateY_in = calcValues(values.messages[1].translateY_in, currentYOffset);

                    objs.messages[1].style.opacity = messageOpacity_in;
                    objs.messages[1].style.transform = `translate3d(0, ${messageTranslateY_in}%, 0)`;
                } else {
                    const messageOpacity_out = calcValues(values.messages[1].opacity_out, currentYOffset);
                    const messageTranslateY_out = calcValues(values.messages[1].translateY_out, currentYOffset);

                    objs.messages[1].style.opacity = messageOpacity_out;
                    objs.messages[1].style.transform = `translate3d(0, ${messageTranslateY_out}%, 0)`;
                }
    
                if (scrollRatio <= 0.62) {
                    const messageOpacity_in = calcValues(values.messages[2].opacity_in, currentYOffset);
                    const messageTranslateY_in = calcValues(values.messages[2].translateY_in, currentYOffset);

                    objs.messages[2].style.opacity = messageOpacity_in;
                    objs.messages[2].style.transform = `translate3d(0, ${messageTranslateY_in}%, 0)`;
                } else {
                    const messageOpacity_out = calcValues(values.messages[2].opacity_out, currentYOffset);
                    const messageTranslateY_out = calcValues(values.messages[2].translateY_out, currentYOffset);

                    objs.messages[2].style.opacity = messageOpacity_out;
                    objs.messages[2].style.transform = `translate3d(0, ${messageTranslateY_out}%, 0)`;
                }
    
                if (scrollRatio <= 0.82) {
                    const messageOpacity_in = calcValues(values.messages[3].opacity_in, currentYOffset);
                    const messageTranslateY_in = calcValues(values.messages[3].translateY_in, currentYOffset);

                    objs.messages[3].style.opacity = messageOpacity_in;
                    objs.messages[3].style.transform = `translate3d(0, ${messageTranslateY_in}%, 0)`;
                } else {
                    const messageOpacity_out = calcValues(values.messages[3].opacity_out, currentYOffset);
                    const messageTranslateY_out = calcValues(values.messages[3].translateY_out, currentYOffset);

                    objs.messages[3].style.opacity = messageOpacity_out;
                    objs.messages[3].style.transform = `translate3d(0, ${messageTranslateY_out}%, 0)`;
                }
                break;
            case 2:
                if (scrollRatio <= 0.32) {
                    const messageOpacity_in = calcValues(values.main_message.opacity_in, currentYOffset);
                    const messageTranslateY_in = calcValues(values.main_message.translateY_in, currentYOffset);

                    objs.main_message.style.opacity = messageOpacity_in;
                    objs.main_message.style.transform = `translate3d(0, ${messageTranslateY_in}%, 0)`;
                } else {
                    const messageOpacity_out = calcValues(values.main_message.opacity_out, currentYOffset);
                    const messageTranslateY_out = calcValues(values.main_message.translateY_out, currentYOffset);

                    objs.main_message.style.opacity = messageOpacity_out;
                    objs.main_message.style.transform = `translate3d(0, ${messageTranslateY_out}%, 0)`;
                }
    
                if (scrollRatio <= 0.67) {
                    const messageOpacity_in = calcValues(values.dsc_messages[0].opacity_in, currentYOffset);
                    const messageTranslateY_in = calcValues(values.dsc_messages[0].translateY_in, currentYOffset);
                    const messageScaleY = calcValues(values.pinOne.scaleY, currentYOffset);

                    objs.dsc_messages[0].style.opacity = messageOpacity_in;
                    objs.dsc_messages[0].style.transform = `translate3d(0, ${messageTranslateY_in}%, 0)`;
                    objs.pinOne.style.transform = `scaleY(${messageScaleY})`;
                } else {
                    const messageOpacity_out = calcValues(values.dsc_messages[0].opacity_out, currentYOffset);
                    const messageTranslateY_out = calcValues(values.dsc_messages[0].translateY_out, currentYOffset);
                    const messageScaleY = calcValues(values.pinOne.scaleY, currentYOffset)

                    objs.dsc_messages[0].style.opacity = messageOpacity_out;
                    objs.dsc_messages[0].style.transform = `translate3d(0, ${messageTranslateY_out}%, 0)`;
                    objs.pinOne.style.transform = `scaleY(${messageScaleY})`;
                }
    
                if (scrollRatio <= 0.93) {
                    const messageOpacity_in = calcValues(values.dsc_messages[1].opacity_in, currentYOffset);
                    const messageTranslateY_in = calcValues(values.dsc_messages[1].translateY_in, currentYOffset);
                    const messageScaleY = calcValues(values.pinOne.scaleY, currentYOffset);
                    
                    objs.dsc_messages[1].style.opacity = messageOpacity_in;
                    objs.dsc_messages[1].style.transform = `translate3d(0, ${messageTranslateY_in}%, 0)`;
                    objs.pinTwo.style.transform = `scaleY(${messageScaleY})`;
                } else {
                    const messageOpacity_out = calcValues(values.dsc_messages[1].opacity_out, currentYOffset);
                    const messageTranslateY_out = calcValues(values.dsc_messages[1].translateY_out, currentYOffset);
                    const messageScaleY = calcValues(values.pinTwo.scaleY, currentYOffset);

                    objs.dsc_messages[1].style.opacity = messageOpacity_out;
                    objs.dsc_messages[1].style.transform = `translate3d(0, ${messageTranslateY_out}%, 0)`;
                    objs.pinTwo.style.transform = `scaleY(${messageScaleY})`;
                }
                break;
        }
    }
    function scrollLoop() {
        enterNewScene = false;
        prevScrollHeight = 0;
        
        for(let i=0; i<currentScene; i++) {
            prevScrollHeight += sceneInfo[i].scrollHeight;
        }

        if(yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
            enterNewScene = true;
            currentScene++;
            document.body.setAttribute('class', `show_scene${currentScene}`);
        }
        if(yOffset < prevScrollHeight) {
            enterNewScene = true;
            if(currentScene === 0) return;
            currentScene--;
            document.body.setAttribute('class', `show_scene${currentScene}`);
        }

        if(enterNewScene) return;
        playAnimation();
    }
    
    window.addEventListener('DOMContentLoaded', setLayout);
    window.addEventListener('resize', setLayout);
    window.addEventListener('scroll', () => {
        yOffset = window.pageYOffset;
        scrollLoop();
    })
    setLayout();
})();