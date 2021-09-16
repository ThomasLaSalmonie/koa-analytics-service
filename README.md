# Koa google analytics controllers

Controller to ask google api reporting v4 [getBatch](https://developers.google.com/analytics/devguides/reporting/core/v4/rest/v4/reports/batchGet)

Working easily with [vue-analytics-charts](https://www.npmjs.com/package/vue-analytics-charts)

### Installation

```sh
$ npm install koa-analytics-service
$ yarn add koa-analytics-service
```

**Use controller**
Basic usage:

```javascript
import Koa from 'koa';
import Router from '@koa/router';
const AnalyticsController = require('koa-analytics-service');

const app = new Koa();
const router = new Router();

router.post('/api/analytics', AnalyticsController.getAnalytics);

app.use(router.routes()).use(router.allowedMethods());

app.listen(3000);
```

## Configuration

Be sure you have the following env variable in your application

| Option                       | Description                                              |
| ---------------------------- | -------------------------------------------------------- |
| `GCP_CREDENTIALS_PATH`       | Google cloud platform service account ID with valid credentials to access reporting apiV4 see [service account reference](https://cloud.google.com/iam/docs/service-accounts)                |
| `GA_VIEW_ID`                 | Google analytics view ID see                                     |

## Request Body [reference](https://developers.google.com/analytics/devguides/reporting/core/v4/rest/v4/reports/batchGet#request-body)

The request Body need to be of the type of [ReportRequest](https://developers.google.com/analytics/devguides/reporting/core/v4/rest/v4/reports/batchGet#ReportRequest)

```js
{
  "reportRequests": [
    {
      object(ReportRequest)
    }
  ],
  "useResourceQuotas": boolean
}
```

The viewId is already added as parameters for each report from env variable

### Fields

|Field|Type|Description|
|-----|----|-----------|
|reportRequests[]|[object(ReportRequest)](https://developers.google.com/analytics/devguides/reporting/core/v4/rest/v4/reports/batchGet#ReportRequest)|Requests, each request will have a separate response. There can be a maximum of 5 requests. All requests should have the same dateRanges, viewId, segments, samplingLevel, and cohortGroup.|
|useResourceQuotas|boolean|Enables [resource based quotas](https://developers.google.com/analytics/devguides/reporting/core/v4/limits-quotas#analytics_reporting_api_v4), (defaults to False). If this field is set to True the per view (profile) quotas are governed by the computational cost of the request. Note that using cost based quotas will higher enable sampling rates. (10 Million for SMALL, 100M for LARGE. See the [limits and quotas documentation](https://developers.google.com/analytics/devguides/reporting/core/v4/limits-quotas#analytics_reporting_api_v4) for details.|

## Response body [reference](https://developers.google.com/analytics/devguides/reporting/core/v4/rest/v4/reports/batchGet#response-body)

```js
{
  "reports": [
    {
      object(Report)
    }
  ],
  "queryCost": number,
  "resourceQuotasRemaining": {
    object(ResourceQuotasRemaining)
  }
}
```

### Fields

|Field|Type|Description|
|-----|----|-----------|
|reports[] | [object(Report)](https://developers.google.com/analytics/devguides/reporting/core/v4/rest/v4/reports/batchGet#Report) | Responses corresponding to each of the request.|
|queryCost | number | The amount of resource quota tokens deducted to execute the query. Includes all responses.|
|resourceQuotasRemaining | [object(ResourceQuotasRemaining)](https://developers.google.com/analytics/devguides/reporting/core/v4/rest/v4/reports/batchGet#ResourceQuotasRemaining) |The amount of resource quota remaining for the property.|

## Changelog

Detailed changes for each release are documented in the [release notes](https://github.com/ThomasLaSalmonie/koa-analytics-service/blob/master/CHANGELOG.md).

## License

vue-analytics-charts is open-sourced software licensed under the [MIT license](http://opensource.org/licenses/MIT)

## Support

Hello, I'm Thomas the maintainer of this project in my free time , if this project does help you in any way please consider to support me. Thanks :smiley:
- [Twitter](https://twitter.com/tlasalmonie)
- [One-time donation via Paypal](https://www.paypal.me/tlasalmonie)