/**
 * create vuex-responsive plugin
 * @param options {{breakPoints,throttle,updateOnResize}}
 * @returns {Function}
 */
function createResponsivePlugin(options = {}) {
    const [smPoint, mdPoint, lgPoint, xlPoint] = options.breakPoints || [768, 992, 1200, 1920];
    const throttleWait = options.throttle || 100;
    const updateOnResize = typeof options.updateOnResize === 'boolean' ? options.updateOnResize : true;

    return function (store) {
        store.registerModule('responsive', {
            namespaced: true,
            state: {
                xs: false,
                sm: false,
                md: false,
                lg: false,
                xl: false,
                only: {
                    xs: false,
                    sm: false,
                    md: false,
                    lg: false,
                    xl: false
                }
            },
            getters: {
                responsive: state => state
            },
            mutations: {
                update(state, docWidth) {
                    Object.assign(state, {
                        xs: docWidth < smPoint,
                        sm: docWidth >= smPoint,
                        md: docWidth >= mdPoint,
                        lg: docWidth >= lgPoint,
                        xl: docWidth >= xlPoint,
                        only: {
                            xs: docWidth < smPoint,
                            sm: between(smPoint, mdPoint),
                            md: between(mdPoint, lgPoint),
                            lg: between(lgPoint, xlPoint),
                            xl: docWidth >= xlPoint
                        }
                    });

                    function between(min, max) {
                        return min <= docWidth && docWidth < max;
                    }
                }
            },
            actions: {
                update(store) {
                    store.commit('update', document.documentElement.clientWidth);
                }
            }
        });

        if (updateOnResize) {
            window.onresize = throttle(function () {
                store.dispatch('responsive/update');
            }, throttleWait);
        }
        store.dispatch('responsive/update');

        function throttle(fn, wait, context) {
            let prev = Date.now();
            return function () {
                let now = Date.now();
                let remaining = wait - (now - prev);
                if (remaining <= 0) {
                    prev = now;
                    fn.apply(context, arguments);
                }
            };
        }
    };
}

export {createResponsivePlugin};
export default createResponsivePlugin();