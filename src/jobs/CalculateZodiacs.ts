import * as App from '@zaiusinc/app-sdk';
import { logger, notifications, ValueHash } from '@zaiusinc/app-sdk';
import { z } from '@zaiusinc/node-sdk';
import { GqlCustomers } from '../data/IncomingCustomer';
import { addZodiacSignToCustomer } from '../lib/addZodiacSignToCustomer';

export interface CalculateZodiacsJobStatus extends App.JobStatus {
  state: {
    lastTimestamp: number;
    count: number;
    retries: number;
  };
}

interface CalculateZodiacsResult {
  lastTimestamp: number;
  customers: GqlCustomers;
}

export class CalculateZodiacs extends App.Job {

  public async prepare(params: ValueHash, status?: CalculateZodiacsJobStatus): Promise<CalculateZodiacsJobStatus> {
    logger.info('Preparing Single Run Zodiacs Job with params:', params, 'and status', status);
    if (status) {
      return status;
    }
    return {state: {lastTimestamp: 0, count: 0, retries: 0}, complete: false};
  }

  public async perform(status: CalculateZodiacsJobStatus): Promise<CalculateZodiacsJobStatus> {
    const state = status.state;
    let encounteredError = false;
    try {
      // fetch some customers from Zaius where the birthdate is present but the Zodiac sign is empty
      const query = `query customersWithDoB { 
        customers(first: 10, filter: "dob_month > 0 and dob_day > 0") { 
          edges { 
            node { 
              name
              email
              dob_day
              dob_month
              dob_year 
            } 
          } 
        } 
      }`;
      const response = await z.graphql(query);

      if (response.success) {
        const result = response.data as CalculateZodiacsResult;
        if (result.customers.edges.length === 0) {
          // Notify the customer we completed the import and provide some information to show it was successful
          await notifications.success(
            'Zodiac Sign Enrichment',
            'Completed Enrichment of Zodiac Signs',
            `Edited ${state.count} customers.`
          );
          status.complete = true;
          return status;
        }

        await z.customer(result.customers.edges.map(addZodiacSignToCustomer));

        state.lastTimestamp = Date.now();
        state.count += result.customers.edges.length;
        state.retries = 0;
        logger.info('Fetched', result.customers.edges.length, 'customers');
      } else {
        logger.error('Historical import error:', response.status, response.statusText, response.errors);
        encounteredError = true;
      }
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
