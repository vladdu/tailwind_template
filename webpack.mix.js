let mix = require('laravel-mix');

let purgecss = require('@fullhuman/postcss-purgecss')({

    // Specify the paths to all of the template files in your project 
    content: [
      './src/**/*.html',
      './src/**/*.vue',
      './src/**/*.jsx',
      // etc.
    ],
  
    // Include any special characters you're using in this regular expression
    defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || []
  })
  

mix.js('src/js/app.js', 'dist/')
    .postCss('src/css/main.css', 'dist/', [
            require('postcss-import')(),
            require('tailwindcss'),
            require('postcss-preset-env')({
                stage: 2,
                features: {
                    'nesting-rules': true
                },
                preserve: false
            }),
            ...process.env.NODE_ENV === 'production'
                ? [purgecss]
                : []
        ])
        .disableSuccessNotifications();

