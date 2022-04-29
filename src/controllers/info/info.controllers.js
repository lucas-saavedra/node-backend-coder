import process from 'process';
const info = async (req, res, next) => {
    const systemInfo = {
        args: process.argv,
        cwd: process.cwd(),
        pId: process.pid,
        nodeVersion: process.version,
        processTitle: process.title,
        platform: process.platform,
        memoryUsage: process.memoryUsage().rss,
    }
    res.json(systemInfo)
};

export { info }