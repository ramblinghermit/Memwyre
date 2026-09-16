import './style.css'
import { createMemwyreApp } from './app'
import router from './router'

import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

const { app } = createMemwyreApp()
app.use(Toast, {
    position: "bottom-right",
    timeout: 3000,
    toastClassName: "brain-vault-toast",
})

router.isReady().then(() => {
    app.mount('#app')
})
