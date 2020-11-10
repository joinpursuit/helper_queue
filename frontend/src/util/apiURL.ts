export const apiURL = () => window.location.hostname === "localhost"
  ? "http://localhost:3001"
  : "https://helper-queue.herokuapp.com";