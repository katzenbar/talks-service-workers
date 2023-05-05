window.addEventListener("DOMContentLoaded", (event) => {
  if ("serviceWorker" in navigator) {
    logServiceWorkerStatus();

    console.log("Calling `navigator.serviceWorker.register`");

    navigator.serviceWorker.register("sw.js", { scope: "/01-lifecycle/" }).catch((err) => {
      console.error("An error occurred when registering the service worker", err);
    });

    navigator.serviceWorker.oncontrollerchange = (ev) => {
      console.log("New service worker activated");
    };

    console.log("This is the service worker currently controlling the page:", navigator.serviceWorker.controller);
  }
});

const logServiceWorkerStatus = () => {
  if (navigator.serviceWorker.controller) {
    console.log("A service worker is already installed");
  } else {
    console.log("We haven't installed a service worker yet");
  }
};
