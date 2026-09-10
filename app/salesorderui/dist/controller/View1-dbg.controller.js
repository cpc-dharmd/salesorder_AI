sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], (Controller,JSONModel) => {
    "use strict";

    return Controller.extend("salesorderui.controller.View1", {
        onInit() {
        },
        onGetSalesOrdder: async function () {
            var prompt = this.getView().byId("salesorder").getValue();

            const response = await fetch("/odata/v4/sales-order/getSalesOrder", {
                method: 'POST',
                headers: {
                    "content-Type": "application/json"
                },
                body: JSON.stringify({ question: prompt })
            });
            const result = await response.json();
            console.log("CAP response", result);
            var salesModel = new JSONModel();
            salesModel.setData({
                salesOrders: [result]
            });
            this.getView().setModel(salesModel, "salesData");
        }
    });
});
