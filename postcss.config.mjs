const config = {
    plugins: {
        "@tailwindcss/postcss": {},
        "postcss-preset-env": {
            autoprefixer: {},
            stage: 3,
            features: {
                "custom-properties": false,
            },
        },
    },
};

export default config;
