import { google } from 'googleapis';
import { GoogleAuth } from 'google-auth-library';

class AnalyticsControllers {
	static async getAnalytics(ctx) {
		const auth = new GoogleAuth({
			keyFilename: process.env.GCP_CREDENTIALS_PATH,
			scopes: 'https://www.googleapis.com/auth/analytics',
		});
		const reportRequests = ctx.request.body;
		for (const reportRequest of reportRequests) {
			reportRequest.viewId = '175215379';
		}
		google.options({auth});
		const res = await google.analyticsreporting('v4').reports.batchGet({
			requestBody: {
				reportRequests
			},
		});
		ctx.body = {
			data: res.data.reports,
		};
	}
}

export default AnalyticsControllers;
