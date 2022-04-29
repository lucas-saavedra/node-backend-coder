import { fork } from 'child_process'
import path from 'path';

const randomGenerator = async (req, res, next) => {
    const forked = fork(path.resolve('src/controllers/randomGenerator', 'randomGeneratorChild.js'))
    const cant = req.query?.cant || 500000000;
    forked.on('message', (data) => {
        if (data == 'ready') {
            forked.send(+cant)
        } else {
            res.json(data)
        }
    })

};

export default  randomGenerator 