import { createApp, h, markRaw } from 'vue'
import page from 'page'
import routes from './routes'
import './assets/index.css'

const DefaultComponent = markRaw({
    render: () => h('div', 'Loading...')
})
const App = {
    data: () => ({
        ViewComponent: null
    }),
    
    render() {
        return h(this.ViewComponent || DefaultComponent)
    },

    created() {
        for (let route in routes) {
            console.log(route)
            page(route, () => {
                this.ViewComponent = markRaw(require('./views/' + routes[route] + '.vue').default)
            })
        }

        page()
    },
}

createApp(App).mount('#app')
