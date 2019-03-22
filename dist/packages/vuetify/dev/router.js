import VueRouter from 'vue-router';
var component1 = {
    template: "<div class=\"title\">Page 1</div>"
};
var component2 = {
    template: "<div class=\"title\">Page 2</div>"
};
var router = new VueRouter({
    routes: [
        {
            path: '/page1',
            name: 'Page 1',
            component: component1
        },
        {
            path: '/page2',
            name: 'Page 2',
            component: component2
        },
        { path: '*', redirect: '/page1' }
    ]
});
export default router;
//# sourceMappingURL=router.js.map