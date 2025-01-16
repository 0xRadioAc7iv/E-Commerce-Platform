import { rateLimiter } from "@radioac7iv/rate-limiter";

export const limiter = rateLimiter({
  key: (request) => request.ip as string,
  limitOptions: () => {
    return { max: 5, window: 24 * 60 * 60 };
  },
});
