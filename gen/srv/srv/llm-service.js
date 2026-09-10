const { OrchestrationClient } = require("@sap-ai-sdk/orchestration");

class LLMService {

    static async extractIntent(question) {

        const orchestrationClient = new OrchestrationClient({
            promptTemplating: {
                model: {
                    name: "gpt-5"
                }
            }
        });

        const prompt = `
You are an SAP Sales Order Agent.

Your job is to identify:
1. Intent
2. Business Object Number

Supported Intents:
- GET_SALES_ORDER

Return ONLY valid JSON.
Do not return markdown.
Do not return explanations.

Examples:

Question:
Get sales order details of 123

Response:
{
  "intent":"GET_SALES_ORDER",
  "salesOrder":"123"
}

Question:
Show sales order 456

Response:
{
  "intent":"GET_SALES_ORDER",
  "salesOrder":"456"
}

Question:
${question}
`;

        const response = await orchestrationClient.chatCompletion({
            messages: [
                {
                    role: "user",
                    content: prompt
                }
            ]
        });

        const content = response.getContent();

        console.log("LLM Response:", content);

        return JSON.parse(content);
    }
}

module.exports = { LLMService };