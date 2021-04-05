import { apiURL } from "../util/apiURL";

const API = apiURL(); 

export default {
  get: jest.fn().mockImplementation((url) => {
    switch (url) {
      case "":
        return Promise.resolve({ data:  []});
      default:
        throw new Error(`UNMATCHED URL: ${url}`);
    }
  }),
};
