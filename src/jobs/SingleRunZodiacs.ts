import * as App from '@zaiusinc/app-sdk';
import {logger, notifications, ValueHash} from '@zaiusinc/app-sdk';
import {z} from '@zaiusinc/node-sdk';

interface SingleRunZodiacsJobStatus extends App.JobStatus {
  state: {
    lastTimestamp: number;
    count: number;
    retries: number;
  };
}

interface SingleRunZodiacsResult {
    lastTimestamp: number;
    customer_count: number;
}

export class SingleRunZodiacs extends App.Job {

    public async prepare(params: ValueHash, status?: SingleRunZodiacsJobStatus): Promise<SingleRunZodiacsJobStatus> {
        logger.info('Preparing Single Run Zodiacs Job with params:', params, 'and status', status);
        if (status) {
            return status;
        }
        return {state: {lastTimestamp: 0, count: 0, retries: 0}, complete: false};
    }

    public async perform(status: SingleRunZodiacsJobStatus): Promise<SingleRunZodiacsJobStatus> {
        const state = status.state;
        let encounteredError = false;
        try {
            // TODO: fetch some customers from Zaius where the birthdate is present but the Zodiac sign is empty
            //const response = await this.fetch(state.lastTimestamp, 100);
            const result = {} as SingleRunZodiacsResult;

            state.lastTimestamp = result.lastTimestamp;
            state.count += result.customer_count;
            state.retries = 0;
            logger.info('Fetched', result.customer_count, 'customers');
        } catch (e) {
            logger.error('Error fetching customers', e);
            encounteredError = true;
        }
    // If we encountered an error, backoff and retry up to 5 times
    if (encounteredError) {
      if (state.retries >= 5) {
        // Notify the customer there was a problem with the import
        await notifications.error(
          'Single Run Zodiacs',
          'Failed to complete',
          'Maximum retries exceeded'
        );
        status.complete = true;
      } else {
        state.retries++;
        await this.sleep(state.retries * 5000);
      }
    }

    // Our state has been updated inside status so we know where to resume
    return status;
    }
}