import { fromPromise, FULFILLED, PENDING, REJECTED } from 'mobx-utils';
import { observer } from 'mobx-react';
import React from 'react';
import { CircularProgress, Typography } from '@material-ui/core';

class Worker {
    operation = null;

    start() {
        this.operation = fromPromise(this.performOperation());
    }

    performOperation() {
        return new Promise((resolve, reject) => {
            const timeoutId = setTimeout(() => {
                clearTimeout(timeoutId);
                Math.random() > 0.25
                    ? resolve('200 OK')
                    : reject(new Error('500 FAIL'));
            }, 1000);
        });
    }
}

@observer
class FromPromise extends React.Component {
    worker;

    constructor(props) {
        super(props);

        this.worker = new Worker();
        this.worker.start();
    }

    render() {
        const { operation } = this.worker;
        return operation.case({
            [PENDING]: () => (
                <React.Fragment>
                    <CircularProgress size={50} color={'primary'} />
                    <Typography variant={'title'}>
                        Operation in Progress
                    </Typography>
                </React.Fragment>
            ),
            [FULFILLED]: value => (
                <Typography variant={'title'} color={'primary'}>
                    Operation completed with result: {value}
                </Typography>
            ),
            [REJECTED]: error => (
                <Typography variant={'title'} color={'error'}>
                    Operation failed with error: {error.message}
                </Typography>
            ),
        });
    }
}

export { FromPromise };