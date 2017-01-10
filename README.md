# About

This is an empty Theme for Storyblok - the cms as a service platform.

It's using gulp and browsersync to proxy the requests to Storyblok so you can edit the theme live.

Checkout the [theme documentation](https://www.storyblok.com/docs/Rendering-Service/Theme-Documentation) to know more about the template syntax.

## Getting started

1. Clone the repository ```git clone https://github.com/Netural/storyblok-netural-setup```
2. Rename ```_token.js``` to ```token.js``` and insert your theme token. You can create your theme token in the space settings of the [Storyblok app](https://app.storyblok.com).  
3. Run ```npm install```
4. Run ```gulp```
5. Ready! You can now edit the templates in ```views``` or defining css/js in the ```source``` folder.

## HTTPS / SSL without errors:

1. https://certsimple.com/blog/localhost-ssl-fix
2. Rename ```_cert.js``` to ```cert.js``` and insert paths to your `key.pem` and `cert.pem`.
