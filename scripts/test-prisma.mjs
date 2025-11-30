import('../dist/src/generated/prisma/client.js')
  .then((m) => {
    const PrismaClient = m.PrismaClient;
    try {
      const c = new PrismaClient();
      console.log('constructed:', typeof c);
    } catch (e) {
      console.error('construction error:');
      console.error(e && e.stack ? e.stack : e);
      process.exit(1);
    }
  })
  .catch((e) => {
    console.error('import error:');
    console.error(e && e.stack ? e.stack : e);
    process.exit(1);
  });
