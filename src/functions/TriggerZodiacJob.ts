import * as App from '@zaiusinc/app-sdk';
import {jobs, logger} from '@zaiusinc/app-sdk';

/**
 * Example event handler.
 * Expects a request in the form:
 *  url: https://[webhook-url]/?email=<email>
 * with a JSON body.
 * Fires a Zaius event and updates the customer's name in Zaius
 */
export class TriggerZodiacJob extends App.Function {
  /**
   * Handle a request to the handle_event function URL
   * this.request contains the request information
   * @returns App.Response as the HTTP response
   */
  public async perform(): Promise<App.Response> {
    try {
      const jobDetail = await jobs.trigger('calculate_zodiacs', {});
      const status = jobDetail.status;

      // return the appropriate status/response
      return new App.Response(200, status);
    } catch (e: any) {
      logger.error(e);
      return new App.Response(500, `An unexpected error occurred: ${e}`);
    }
  }
}
