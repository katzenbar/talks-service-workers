window.addEventListener("DOMContentLoaded", async () => {
  if ("serviceWorker" in navigator) {
    try {
      await navigator.serviceWorker.register("sw.js", { scope: "/02-precache/" });
    } catch (error) {
      console.error("An error occurred when registering the service worker", error);
    }
  }
});
