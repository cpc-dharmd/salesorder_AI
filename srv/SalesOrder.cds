@Service.path:'/sales-order'
service SalesOrder {

    type SalesOrderResponse {
        success     : Boolean;
        salesOrder  : String;
        soldToParty : String;
        netAmount   : Decimal(15,2);
        currency    : String;
        message     : String;
    }

    action getSalesOrder(
        question : String
    ) returns SalesOrderResponse;
}