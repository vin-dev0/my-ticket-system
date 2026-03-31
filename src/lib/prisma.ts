// This file is a mock of the Prisma client for the static frontend showcase.
// It allows the application to build and run without a real database.

const prismaMock: any = new Proxy({}, {
  get: (target, prop) => {
    // Return a function that returns a promise of an empty array/object
    return () => Promise.resolve([]);
  }
});

export const prisma = prismaMock;
export default prisma;
