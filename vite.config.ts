import { defineConfig } from 'vite'
import laravel from 'laravel-vite-plugin'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [
        laravel({
            input: [
                'resources/css/app.css',
                'resources/js/app.jsx',
            ],
            refresh: true,
        }),
        react(),
    ],

    server: {
        host: '0.0.0.0',
        port: 5173,
        strictPort: true,

        origin: 'http://crm.local:5173',

        cors: {
            origin: [
                'http://crm.local:8080',
                'http://localhost:8080',
            ],
            credentials: true,
        },

        allowedHosts: [
            'crm.local',
            'localhost',
            '127.0.0.1',
        ],

        hmr: {
            host: 'crm.local',
            protocol: 'ws',
            port: 5173,
        },
    },
})