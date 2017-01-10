// LIVE
export let config = {
    url : window.location.hostname
}

// TEST
if (window.location.hostname.search(/YOUR_TEST_DOMAIN/i) != -1) {
}

// DEV
if (window.location.hostname.search(/localhost/i) != -1 || window.location.hostname.search(/0.0.0.0/i) != -1) {
}