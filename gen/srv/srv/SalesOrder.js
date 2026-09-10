const cds = require('@sap/cds');
const { executeHttpRequest } = require('@sap-cloud-sdk/http-client');
const { LLMService } = require('./llm-service');

module.exports = cds.service.impl(async function () {

  this.on('getSalesOrder', async (req) => {

    const { question } = req.data;
    console.log("Question", question);

    // LLM Call
    const LLMIntent =
      await LLMService.extractIntent(question);

    const intent = LLMIntent?.intent;
    const salesOrderNo = LLMIntent?.salesOrder;

    console.log("LLM Intent Response:", LLMIntent);
    console.log("Intent:", intent);
    console.log("Sales Order:", salesOrderNo);

    if (intent === 'GET_SALES_ORDER') {

      // S4 Connectivity

      const response = await executeHttpRequest(
        {
          destinationName: 'D4X_HTTP'
        },
        {
          method: 'GET',
          url: `/sap/opu/odata/sap/API_SALES_ORDER_SRV/A_SalesOrder('${salesOrderNo}')?$format=json`
        }
      );

      console.log("myresponse", response);

      const so = response.data.d;

      return {
        success: true,
        salesOrder: so.SalesOrder,
        salesOrderType: so.SalesOrderType,
        salesOrganization:so.SalesOrganization,
        creationDate:so.CreationDate,
        soldToParty: so.SoldToParty,
        netAmount: so.TotalNetAmount,
        currency: so.TransactionCurrency,
        message: 'Success'
      };
    }
  });

});